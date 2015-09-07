define('templates/helpers/compare', ['hbs/handlebars'], function ( Handlebars ) {

  Handlebars.registerHelper('compare', function(lvalue, operator, rvalue, options) {
    var operators, result;
    operators = void 0;
    result = void 0;
    if (arguments.length < 3) {
      throw new Error('Handlebars Helper \'compare\' needs 2 parameters');
    }
    if (options === void 0) {
      options = rvalue;
      rvalue = operator;
      operator = '===';
    }
    operators = {
      '===': function(l, r) {
        return l === r;
      },
      '==': function(l, r) {
        return l == r;
      },
      '!=': function(l, r) {
        return l !== r;
      },
      '<': function(l, r) {
        return l < r;
      },
      '>': function(l, r) {
        return l > r;
      },
      '<=': function(l, r) {
        return l <= r;
      },
      '>=': function(l, r) {
        return l >= r;
      }
    };
    if (!operators[operator]) {
      throw new Error("Handlerbars Helper \'compare\' doesn\'t know the operator " + operator);
    }
    result = operators[operator](lvalue, rvalue);
    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

});
