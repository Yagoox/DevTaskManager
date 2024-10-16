// backend/Program.cs

using Microsoft.EntityFrameworkCore;
using DevTaskManager.Services;
using DevTaskManager.Models;
using DevTaskManager.Data;
using System.Text.Json.Serialization; // Diretiva 'using' movida para o topo

var builder = WebApplication.CreateBuilder(args);

// Adiciona serviços ao contêiner.
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true; // Torna a desserialização insensível a maiúsculas/minúsculas
    options.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
});

// Registrar os serviços
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Configurar o DbContext com SQLite usando o AppDbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurar CORS para permitir requisições do frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policyBuilder =>
        {
            policyBuilder.WithOrigins("http://localhost:5173") // Ajuste conforme a URL do seu frontend
                         .AllowAnyHeader()
                         .AllowAnyMethod();
        });
});

// Opcional: Adicionar Swagger para documentação da API
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configurar o pipeline HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
