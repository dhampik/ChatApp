using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatApp.Models
{
    public class Message
    {
        public int ID { get; set; }
        public string Author { get; set; }
        public string MessageText { get; set; }
    }

    public class MessageDBContext : DbContext
    {
        public DbSet<Message> Messages { get; set; } 
    }
}