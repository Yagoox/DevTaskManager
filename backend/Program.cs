using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using DevTaskManager.Data;
using DevTaskManager.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.OpenApi.Models; // Para Swagger
using Microsoft.Extensions.Configuration;  // Para acessar GetConnectionString
 // Para UseSqlite


var builder = WebApplication.CreateBuilder(args);

// Adicionar serviços ao container.
builder.Services.AddControllers();

// Configurar o CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Adicionar o Swagger para documentação da API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar o DbContext com SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar os serviços
builder.Services.AddScoped<IProjectService, ProjectService>();

var app = builder.Build();

// Configurar o middleware de pipeline de requisição HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usar o CORS
app.UseCors("AllowAllOrigins");

// app.UseHttpsRedirection(); // Descomente se estiver usando HTTPS

app.UseAuthorization();

app.MapControllers();

app.Run();
