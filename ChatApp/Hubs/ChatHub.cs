using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using ChatApp.Models;

namespace ChatApp.Hubs
{
    public class ChatHub : Hub
    {
        private MessageDBContext db = new MessageDBContext();

        public void Send(string name, string message)
        {
            db.Messages.Add(new Message { Author = name, MessageText = message });
            db.SaveChanges();
            // Call the addNewMessageToPage method to update clients.
            Clients.All.addNewMessageToPage(name, message);
        }
    }
}