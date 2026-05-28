namespace Portfolio.Models;

public class BlogPostMeta
{
    public string Slug { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Summary { get; set; } = string.Empty;
    public DateTime Date { get; set; }
    public List<string> Tags { get; set; } = new();
    public int ReadingMinutes { get; set; }
}

public class BlogPost
{
    public BlogPostMeta Meta { get; set; } = new();
    public string HtmlContent { get; set; } = string.Empty;
}
