using ECommerce.API.DataAccess;
using ECommerce.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.API.Controllers

{
    [Route("api/[controller]")]
    [ApiController]
    public class ShoppingController : ControllerBase
    {
        readonly IDataAccess dataAccess;
        private readonly string DateFormat;
        public ShoppingController(IDataAccess dataAccess, IConfiguration configuration)
        {
            this.dataAccess = dataAccess;
            DateFormat = configuration["Constants:DateFormat"];
        }

        [HttpGet("GetCategoryList")]
        public IActionResult GetCategoryList()
        {
            var result = dataAccess.GetProductCategories();
            return Ok(result);
        }

        [HttpGet("GetProducts")]
        public IActionResult GetProducts(string category, string subcategory, int count)
        {
            var result = dataAccess.GetProducts(category, subcategory, count);
            return Ok(result);
        }


        [HttpGet("GetProduct/{id}")]
        public IActionResult GetProduct(int id)
        {
            var result = dataAccess.GetProduct(id);
            return Ok(result);
        }

        [HttpPut("PutProduct/{id}")]
        public IActionResult PutProduct(int id,float Price,int Quantity)
        {
            var result = dataAccess.PutProduct(id, Price,Quantity);
            return Ok(result);
        }

        [HttpPost("AddCategory")]
        public IActionResult ProductCategoryAdd( string Category, string SubCategory)
        {
            var id = dataAccess.ProductCategoryAdd(  Category, SubCategory);
            return Ok(id.ToString());
        }


        [HttpGet("GetUser/{id}")]
        public IActionResult GetUser(int id)
        {
            var result = dataAccess.GetUser(id);
            return Ok(result);
        }


        [HttpPost("RegisterUser")]
        public IActionResult RegisterUser([FromBody] User user)
        {
            user.CreatedAt = DateTime.Now.ToString(DateFormat);
            user.ModifiedAt = DateTime.Now.ToString(DateFormat);

            var result = dataAccess.InsertUser(user);

            string? message;
            if (result) message = "Register Sucessfully";
            else message = "email not available";
            return Ok(message);
        }

        
     


        [HttpPost("LoginUser")]
        public IActionResult LoginUser([FromBody] User user)
        {
            var token = dataAccess.IsUserPresent(user.Email, user.Password);
            if (token == "") token = "invalid";
            return Ok(token);
        }

        [HttpPost("InsertReview")]
        public IActionResult InsertReview([FromBody] Review review)
        {
            review.CreatedAt = DateTime.Now.ToString(DateFormat);
            dataAccess.InsertReview(review);
            return Ok("inserted");
        }
       


        [HttpGet("GetProductReviews/{productId}")]
        public IActionResult GetProductReviews(int productId)
        {
            var result = dataAccess.GetProductReviews(productId);
            return Ok(result);
        }

        [HttpPost("InsertCartItem/{userid}/{productid}")]
        public IActionResult InsertCartItem(int userid, int productid)
        {
            var result = dataAccess.InsertCartItem(userid, productid);
            return Ok(result ? "inserted" : "not inserted");
        }

        [HttpGet("GetActiveCartOfUser/{id}")]
        public IActionResult GetActiveCartOfUser(int id)
        {
            var result = dataAccess.GetActiveCartOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetAllPreviousCartsOfUser/{id}")]
        public IActionResult GetAllPreviousCartsOfUser(int id)
        {
            var result = dataAccess.GetAllPreviousCartsOfUser(id);
            return Ok(result);
        }

        [HttpGet("GetPaymentMethods")]
        public IActionResult GetPaymentMethods()
        {
            var result = dataAccess.GetPaymentMethods();
            return Ok(result);
        }

        [HttpPost("InsertPayment")]
        public IActionResult InsertPayment(Payment payment)
        {
            payment.CreatedAt = DateTime.Now.ToString();
            var id = dataAccess.InsertPayment(payment);
            return Ok(id.ToString());
        }

        [HttpPost("InsertOrder")]
        public IActionResult InsertOrder(Order order)
        {
            order.CreatedAt = DateTime.Now.ToString();
            var id = dataAccess.InsertOrder(order);
            return Ok(id.ToString());
        }

        
    }
}
