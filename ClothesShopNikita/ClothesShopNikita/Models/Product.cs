namespace ClothesShopNikita.Models
{
    public class Product
    {
        public Guid id {  get; set; }

        public string[] categories { get; set; }

        public string[] color { get; set; }

        public string createdAt { get; set; }

        public string desc { get; set; }

        public string img { get; set; }

        public int inStock { get; set; }

        public int price { get; set; }

        public string[] size { get; set; }

        public string title { get; set; }

        public string updatedAt { get; set; }

        public int __v { get; set; }
    }
}
