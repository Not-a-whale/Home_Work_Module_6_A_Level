using ClothesShopNikita.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ClothesShopNikita.Services
{
    public class SingletonService
    {

        private static SingletonService instance;
        public List<Product> Products { get; private set; }

        private SingletonService()
        {
            this.Products = this.LoadJson();
        }

        public static SingletonService getInstance()
        {
            if (instance == null)
                instance = new SingletonService();
            return instance;
        }

        public List<Product> GetProducts()
        {
            return this.Products;
        }

        public Product GetProduct(Guid id)
        {
            Product? product = this.Products.Find(product => product.id == product.id);

            if(product == null)
            {
                WrongInput();
            }

            return product;
        }

        public void AddProduct(Product product)
        {
            this.Products.Add(product);
        }

        public void UpdateProduct(Guid id, Product product)
        {
            int index = this.Products.FindIndex(s => s.id == id);
            product.id = id;
            if (index != -1)
                this.Products[index] = product;
            else WrongInput();
        }

        public void DeleteProduct(Guid id)
        {
            int index = this.Products.FindIndex(s => s.id == id);
            if(index != -1)
                this.Products.RemoveAt(index);
            else WrongInput();
        }

        private List<Product> LoadJson()
        {
            string jsonData = File.ReadAllText("./Assets/products.json", System.Text.Encoding.ASCII);
            dynamic? jsonDataDeserialized = JsonConvert.DeserializeObject<object>(jsonData);
            List<Product> products = new List<Product>();
            if (jsonDataDeserialized != null)
            {
                foreach(JObject product in jsonDataDeserialized.products) 
                {
                    var productObj = product.ToObject<Product>();
                    productObj.id = Guid.NewGuid();
                    products.Add(productObj);
                }
                return products;
            }
            else
            {
                WrongInput();
            }
            return products;
        }

        public static void WrongInput()
        {
            throw new Exception("There is no product with such an id");
        }
    }
}
