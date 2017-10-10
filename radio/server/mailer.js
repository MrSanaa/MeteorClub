smtp = {
    username: "business_radio_28",
    password: "9rFkDvwFPrVkd3+oU9gF",
    server: 'cuttlefish.nmtec.co',
    port: 2525
}

try {
    return process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + 
    	encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
} catch (error1) {
    error = error1;
    return console.log(error);
}
