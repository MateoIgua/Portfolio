namespace Portfolio.Models;

public class Project
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Tags { get; set; } = new();
    public string? RepoUrl { get; set; }
    public string? DemoUrl { get; set; }
    public string? ImageUrl { get; set; }
    public int Year { get; set; }
}
