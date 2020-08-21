using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using static DodGyEdumacationAPI.Startup;

namespace DodGyEdumacationAPI.JWT
{
    public class JWTMiddleware
    {
        public static void ConfigureJWT(IServiceCollection services)
        {
            services.AddAuthentication(opt =>
            {
                opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ClockSkew = TimeSpan.Zero,
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Config.GetSection("AppSettings").GetSection("Url").Value,
                    ValidAudience = Config.GetSection("AppSettings").GetSection("Url").Value,
                    IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(Config.GetSection("AppSettings").GetSection("Secret").Value))
                };
            });
        }
    }
}
