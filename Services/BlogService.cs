using System.Net.Http.Json;
using Markdig;
using Portfolio.Models;

namespace Portfolio.Services;

public class BlogService
{
    private readonly HttpClient _http;
    private readonly MarkdownPipeline _pipeline;
    private List<BlogPostMeta>? _indexCache;
    private readonly Dictionary<string, BlogPost> _postCache = new();

    public BlogService(HttpClient http)
    {
        _http = http;
        _pipeline = new MarkdownPipelineBuilder()
            .UseAdvancedExtensions()
            .UseSoftlineBreakAsHardlineBreak()
            .Build();
    }

    public async Task<IReadOnlyList<BlogPostMeta>> GetIndexAsync()
    {
        if (_indexCache is not null)
            return _indexCache;

        var index = await _http.GetFromJsonAsync<List<BlogPostMeta>>("posts/index.json");
        _indexCache = index?.OrderByDescending(p => p.Date).ToList() ?? new List<BlogPostMeta>();
        return _indexCache;
    }

    public async Task<BlogPost?> GetPostAsync(string slug)
    {
        if (_postCache.TryGetValue(slug, out var cached))
            return cached;

        var index = await GetIndexAsync();
        var meta = index.FirstOrDefault(p => p.Slug == slug);
        if (meta is null)
            return null;

        var markdown = await _http.GetStringAsync($"posts/{slug}.md");
        var html = Markdown.ToHtml(markdown, _pipeline);

        var post = new BlogPost { Meta = meta, HtmlContent = html };
        _postCache[slug] = post;
        return post;
    }
}
