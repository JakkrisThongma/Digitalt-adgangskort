namespace api.Models
{
    public class IdentityDto
    {
        public bool IsAuthenticated { get; set; }
        public string UserId { get; set; }
        public string Mail { get; set; }
    }
}