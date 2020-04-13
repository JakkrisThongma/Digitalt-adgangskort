using System;
using System.IO;

namespace api.Helpers
{
    public class PhotoBase64Converter
    {
        public static string StreamToBase64ImageString( Stream stream)
        {
          
            var pictureMemoryStream = new MemoryStream();
            stream.CopyToAsync(pictureMemoryStream);

            // Convert stream to byte array.
            var pictureByteArray = pictureMemoryStream.ToArray();

            // Convert byte array to base64 string.
            var pictureBase64 = Convert.ToBase64String(pictureByteArray);

            var photo = "data:image/jpeg;base64," + pictureBase64;

            return photo;
        }
        
    }
}