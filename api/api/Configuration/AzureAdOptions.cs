namespace api.Configuration
{
    public class AzureAdOptions
    {
        public string Instance { get; set; }

        public string ClientId { get; set; }
        public string Tenant { get; set; }
        public string Authority => Instance + Tenant;
        public string ClientSecret { get; set; }
        public string GraphResource { get; set; }
        public string GraphResourceEndPoint { get; set; }
    }
}