// var Handlebars = require("handlebars/runtime");  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
// templates['profile.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
//     var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

//   return "\n    <div class=\"panel panel-default\">\n      <div class=\"panel-body\">\n        <ul class=\"list-group\">\n"
//     + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
//     + "        </ul>\n      </div>\n      <div class=\"panel-footer\">"
//     + alias3(alias2(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalPrice : stack1), depth0))
//     + " €</div>\n    </div>\n      <a href=\"/order/imprimer/F&"
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "\"><button type=\"button\" class=\"btn btn-success\">Facture</button></a>\n      <a href=\"/order/imprimer/A&"
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "\"><button type=\"button\" class=\"btn btn-success\">Avoir</button></a>\n    <!--  <form>\n        <input type=\"button\" href=\"/order/imprimer/"
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "\"  id=\"impression\" class=\"btn btn-primary\" value=\"Facture\" />\n      <input type=\"button\" href=\"/order/imprimer/"
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "\" id=\"impression\" class=\"btn btn-primary\" value=\"Avoir\" />\n    </form>  -->\n  </br>\n</br>\n\n<div  id=\""
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "F\" style=\"display: none;\" class=\"impression\">\n  <div class=\"panel panel-default\">\n    <!-- Default panel contents -->\n    <div class=\"panel-heading\"><h4>Commande n° "
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "</h4></div>\n    <table class=\"table\">\n        <tr><th colspan=\"4\" style='text-align:center;'>FACTURE</th></tr>\n    <tr>\n      <th>Produit</th>\n      <th>Quantité</th>\n      <th>Prix Hors Taxe</th>\n      <th>Prix TTC</th>\n    </tr>\n"
//     + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
//     + "    <tr>\n      <td><strong>Total</strong></td>\n      <td><strong>"
//     + alias3(alias2(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalQty : stack1), depth0))
//     + "</strong></td>\n      <td><strong>"
//     + alias3(alias2(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalPriceHT : stack1), depth0))
//     + " €</strong></td>\n      <td><strong>"
//     + alias3(alias2(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalPrice : stack1), depth0))
//     + " €</strong></td>\n  </table>\n  </div>\n</div>\n<div  id=\""
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "A\" style=\"display: none;\" class=\"impression\">\n  <div class=\"panel panel-default\">\n    <!-- Default panel contents -->\n    <div class=\"panel-heading\"><h4>Commande n° "
//     + alias3(alias2((depth0 != null ? depth0._id : depth0), depth0))
//     + "</h4></div>\n    <table class=\"table\">\n        <tr><th colspan=\"4\" style='text-align:center;'>AVOIR</th></tr>\n    <tr>\n      <th>Produit</th>\n      <th>Quantité</th>\n      <th>Prix Hors Taxe</th>\n      <th>Prix TTC</th>\n    </tr>\n"
//     + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.items : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
//     + "    <tr>\n      <td><strong>Total</strong></td>\n      <td><strong>"
//     + alias3(alias2(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalQty : stack1), depth0))
//     + "</strong></td>\n      <td><strong>"
//     + alias3(alias2(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalPriceHT : stack1), depth0))
//     + " €</strong></td>\n      <td><strong>"
//     + alias3(alias2(((stack1 = (depth0 != null ? depth0.panier : depth0)) != null ? stack1.totalPrice : stack1), depth0))
//     + " €</strong></td>\n  </table>\n  </div>\n</div>\n\n\n";
// },"2":function(container,depth0,helpers,partials,data) {
//     var stack1, alias1=container.lambda, alias2=container.escapeExpression;

//   return "          <li class=\"list-group-item\">\n            <span class=\"badge\">"
//     + alias2(alias1((depth0 != null ? depth0.price : depth0), depth0))
//     + " €</span>\n            "
//     + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.title : stack1), depth0))
//     + " | "
//     + alias2(alias1((depth0 != null ? depth0.qty : depth0), depth0))
//     + " éléments.\n          </li>\n";
// },"4":function(container,depth0,helpers,partials,data) {
//     var stack1, alias1=container.lambda, alias2=container.escapeExpression;

//   return "    <tr>\n      <td>"
//     + alias2(alias1(((stack1 = (depth0 != null ? depth0.item : depth0)) != null ? stack1.title : stack1), depth0))
//     + "</td>\n      <td> "
//     + alias2(alias1((depth0 != null ? depth0.qty : depth0), depth0))
//     + "</td>\n      <td> "
//     + alias2(alias1((depth0 != null ? depth0.priceHT : depth0), depth0))
//     + "</td>\n      <td> "
//     + alias2(alias1((depth0 != null ? depth0.price : depth0), depth0))
//     + "</td>\n    </tr>\n";
// },"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
//     var stack1;

//   return "<div class=\"row\">\n  <div class=\"col-md-8 col-md-offset-2\">\n    <h1>Profil d'utilisateur</h1>\n    <hr>\n    <h2>Mes Commandes :</h2>\n"
//     + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.orders : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
//     + "</div>\n</div>\n\n\n\n\n\n<script type=\"text/javascript\">\nfunction imprimer_page(id){\n  divToPrint = getElementById(id);\n  divToPrint.print();\n}\nfunction printDiv(divName) {\n  var printContents = document.getElementById(divName).innerHTML;\n  var originalContents = document.body.innerHTML;\n\n  document.body.innerHTML = printContents;\n\n  window.print();\n\n  document.body.innerHTML = originalContents;\n}\n</script>\n";
// },"useData":true});
