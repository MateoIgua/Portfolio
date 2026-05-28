using Microsoft.JSInterop;

namespace Portfolio.Services;

/// <summary>
/// Persists the user's preferred theme (light/dark) in localStorage
/// and applies it to the &lt;html&gt; element via a data-theme attribute.
/// The initial theme is applied by an inline script in index.html before
/// Blazor boots, so this service only reads/writes after that.
/// </summary>
public class ThemeService
{
    private readonly IJSRuntime _js;
    private const string StorageKey = "portfolio-theme";
    private bool _initialized;

    public string CurrentTheme { get; private set; } = "dark";

    public event Action? OnThemeChanged;

    public ThemeService(IJSRuntime js)
    {
        _js = js;
    }

    public async Task InitializeAsync()
    {
        if (_initialized) return;
        try
        {
            var stored = await _js.InvokeAsync<string?>("localStorage.getItem", StorageKey);
            CurrentTheme = string.IsNullOrEmpty(stored) ? "dark" : stored;
            _initialized = true;
        }
        catch
        {
            CurrentTheme = "dark";
        }
    }

    public async Task ToggleAsync()
    {
        CurrentTheme = CurrentTheme == "dark" ? "light" : "dark";
        await _js.InvokeVoidAsync("localStorage.setItem", StorageKey, CurrentTheme);
        await _js.InvokeVoidAsync(
            "document.documentElement.setAttribute", "data-theme", CurrentTheme);
        OnThemeChanged?.Invoke();
    }
}
