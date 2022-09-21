using ClothesShopNikita.Models;
using ClothesShopNikita.Services;
using Microsoft.AspNetCore.Mvc;

namespace ClothesShopNikita.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShopController : Controller
    {
        private readonly SingletonService service;
        public ShopController()
        {
            this.service = SingletonService.getInstance();
        }

        [HttpGet]
        public IActionResult GetProduscts()
        {
            return Ok(service.GetProducts());
        }

        [HttpGet]
        [Route("{id:guid}")]
        public IActionResult GetProduct([FromRoute] Guid id)
        {
            return Ok(service.GetProduct(id));
        }

        [HttpPost]
        public IActionResult PostProduct(Product product)
        {
            Guid id = Guid.NewGuid();
            product.id = id;
            service.AddProduct(product);
            return Ok();
        }

        [HttpPatch]
        [Route("{id:guid}")]
        public IActionResult GetProduct([FromRoute] Guid id, Product product)
        {
            service.UpdateProduct(id, product);
            return Ok();
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteProduct([FromRoute] Guid id)
        {
            service.DeleteProduct(id);
            return Ok();
        }

    }
}
