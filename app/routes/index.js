
module.exports =  (app, path) => {
    

    require("./user.routes")(app, '/api/user');
    require("./entreprise.routes")(app, '/api/entreprise');
    require("./gare.routes")(app, '/api/gare');
    require("./trajet.routes")(app, '/api/trajet');
    require("./tarif.routes")(app, '/api/tarif');
    require("./ticket.routes")(app, '/api/ticket');
    require("./attribution.routes")(app, '/api/attribution');
    require("./logs.routes")(app, '/api/logs');
    require("./image.routes")(app, '/api');

}