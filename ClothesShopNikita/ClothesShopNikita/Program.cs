var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors(builder =>
  builder.WithOrigins("http://localhost:8080")
  .AllowAnyHeader()
  .AllowCredentials()
  .AllowAnyMethod());

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
Console.Write("I am here");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
