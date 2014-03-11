$(function () {
    // Reference the auto-generated proxy for the hub.
    var chat = $.connection.chatHub;
    // Create a function that the hub can call back to display messages.
    chat.client.addNewMessageToPage = function (name, message) {
        // Add the message to the page.
        $('#discussion').append('<div class="col-sm-2 col-md-2 text-right"><strong>' + htmlEncode(name)
            + '</strong></div><div class="col-sm-10 col-md-10">' + htmlEncode(message) + '</div>');
        $("#discussion").scrollTop($("#discussion")[0].scrollHeight);
    };
    // Get the user name and store it to prepend to messages.
    $('#displayName').val(prompt('Enter your name:', ''));
    $('#displayNameText').text($('#displayName').val());
    // Set initial focus to message input box.
    $('#message').focus();
    // Start the connection.
    $.connection.hub.start().done(function () {
        $('#sendMessage').click(function () {
            var text = $.trim($('#message').val());
            if (text === '') { return; }
            // Call the Send method on the hub.
            chat.server.send($('#displayName').val(), text);
            // Clear text box and reset focus for next comment.
            $('#message').val('').focus();
        });
        $('#message').on('keydown', function (e) {
            if ((e.keyCode == 10 || e.keyCode == 13) && e.ctrlKey) {
                $('#sendMessage').click();
            }
        });
    });
});

// This optional function html-encodes messages for display in the page.
function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}