using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly AppDbContext _db;
    public AccountController(AppDbContext db) => _db = db;

    [HttpPost("update")]
    public IActionResult UpdateAccount([FromBody] AccountUpdateModel model)
    {
        var user = _db.Users.FirstOrDefault(u => u.Id == model.UserId);
        if (user == null) return NotFound();

        user.Username = model.Username;
        user.Description = model.Description;
        user.Email = model.Email;
        _db.SaveChanges();

        return Ok(new { success = true, message = "Account updated successfully." });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginModel model)
    {
        var user = _db.Users.FirstOrDefault(u => u.Username == model.Username && /* check password */);
        if (user == null) return Unauthorized();

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Name, user.Username)
        };
        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
        return Ok(new { success = true });
    }
}

public class AccountUpdateModel
{
    public string UserId { get; set; } // Or get from auth context
    public string Username { get; set; }
    public string Description { get; set; }
    public string Email { get; set; }
}

public class LoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}