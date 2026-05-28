using System.Net.Http.Json;
using Portfolio.Models;

namespace Portfolio.Services;

public class ProjectService
{
    private readonly HttpClient _http;
    private List<Project>? _cache;

    public ProjectService(HttpClient http)
    {
        _http = http;
    }

    public async Task<IReadOnlyList<Project>> GetAllAsync()
    {
        if (_cache is not null)
            return _cache;

        var projects = await _http.GetFromJsonAsync<List<Project>>("data/projects.json");
        _cache = projects ?? new List<Project>();
        return _cache;
    }
}
