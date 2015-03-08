var esprima = require("esprima");
var options = {tokens:true, tolerant: true, loc: true, range: true };
var fs = require("fs");
var istanbul = require('istanbul');
//no. of functions
//no. of parameters per function
//cyclomatic complexity

function main()
{
	var args = process.argv.slice(2);

	if( args.length == 0 )
	{
		args = ["site.js"];
	}
	var filePath = args[0];
	
	complexity(filePath);
	complexityBuilder.report();
	
	//dynamic(filePath);

}

function dynamic(filePath)
{
	var inst = new istanbul.Instrumenter({embedSource:true});
	var buf = fs.readFileSync(filePath, 'utf8');
	inst.instrument(buf, function (err, data) {
		console.log(data);
	});
}

var complexityBuilder = 
{
	Functions:0,
	// Number of if statements/loops + 1
	SimpleCyclomaticComplexity: 1,
	// The max depth of scopes (nested ifs, loops, etc)
	MaxNestingDepth: 0,
	// Average number of parameters for functions
	MeanParameterCount: 0,
	// Max number of parameters for functions
	MaxParameterCount: 0,

	report : function()
	{
		console.log(
		   ("Number of functions {0}\n" + 
			"Cyclomatic complexity {1}\n")
			.format(complexityBuilder.Functions,complexityBuilder.SimpleCyclomaticComplexity, this.MaxNestingDepth)
		);
	}
};

function complexity(filePath)
{
	var buf = fs.readFileSync(filePath, "utf8");
	var result = esprima.parse(buf, options);

	traverse(result, function (node) 
	{
		if (node.type === 'FunctionDeclaration') 
		{
			var result= {nestedDepth:0};
			visitDepth(node, 0 ,result);
			
			if(result.nestedDepth > complexityBuilder.MaxNestingDepth)
				complexityBuilder.MaxNestingDepth = result.nestedDepth;
				
				console.log( "Line : {0} Function: {1} Parameters : {2} ".format(node.loc.start.line,
				functionName(node), node.params.length));
				complexityBuilder.Functions++;

				//complexityBuilder.SimpleCyclomaticComplexity ++;	
				//console.log(node);
				// console.log(node.loc.start.line);
				// console.log(node.loc.end.line);
				 var i = 0
				//var i=;

				if(node.body.type=="BlockStatement")
				{
					//console.log("block");
					//while(i < node.body.length){
					//console.log(node.body.body.length);	
					// if(node.body[i].type = "ExpressionStatement")
					// {
					 while(i< node.body.body.length)
					{
						if(node.body.body[i].type == "ExpressionStatement"){

						if(node.body.body[i].expression.right.arguments[0].properties!=undefined){	
					 	//console.log(node.body.body[i].expression.right.arguments[0].properties[0].key.name);
					 		var x = node.body.body[i].expression.right.arguments[0].properties[0].key.loc.start.line;
					 	//console.log(x);
					 		console.log( "Line : {0} Function: {1} Parameters : {2} ".format(x,
								functionName(node.body.body[i].expression.right.arguments[0].properties[0].key.name), node.body.body[i].expression.right.arguments[0].properties[0].value.params.length));
					 		complexityBuilder.Functions++;
					 		}
				 		}
					 i++;
					}	
				}			 
		}

		// if(node.type == "ExpressionStatement")
		// 		{
		// 			console.log("exp")
		// 			if(node.expression.right.type == "CallExpression")
		// 			{
		// 				console.log("call");
		// 				if(node.expression.right.callee.type == "CalleeExpression"){
		// 					console.log( "Line : {0} Function: {1} Parameters : {2}".format(node.right.loc.start.line,
		// 					functionName(node.right[1][1].name), node.right.params.length));
		// 					complexityBuilder.Functions++;}

		// 			}
		// 		}
		
		
		// if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') 
		// {
		// 	complexityBuilder.MeanParameterCount = complexityBuilder.MeanParameterCount + node.params.length;
		
		// 	if(node.params.length > complexityBuilder.MaxParameterCount)
		// 		complexityBuilder.MaxParameterCount = node.params.length;	
		// 		//complexityBuilder.SimpleCyclomaticComplexity ++;		
		// }
		
		if (node.type === 'IfStatement' || node.type === 'WhileStatement' || node.type === 'DoWhileStatement' || node.type==='SwitchStatement' || node.type==='ForStatement')
		{
			complexityBuilder.SimpleCyclomaticComplexity ++;
		} 
			
	});
}

function isDecision(node)
{
	if (node.type === 'IfStatement' || node.type === 'WhileStatement' || node.type === 'DoWhileStatement' || node.type==='SwitchStatement' || node.type==='ForStatement')
		{
			return true;
		} 
	else
			return false;	
}

function visitDepth(node, depth, result)
{
	var key, child;
	var children=0;
     for (key in node) {
        if (node.hasOwnProperty(key)) {
            child = node[key];
            if (typeof child === 'object' && child !== null) {
				//console.log(depth);
				if(key=="alternate")
				{
					visitDepth(child,depth,result);
				}
				else if(isDecision(child))
				{
                visitDepth(child,depth+1,result);
				}
				else
				{
					visitDepth(child,depth,result);
				}
				children++;
            }
        }
		
    }	
	if(children == 0)
	{
		if(result.nestedDepth < depth)
			result.nestedDepth = depth;
	}
	
}

function traverse(object, visitor) 
{
    var key, child;

    visitor.call(null, object);
    for (key in object) {
        if (object.hasOwnProperty(key)) {
            child = object[key];
            if (typeof child === 'object' && child !== null) {
                traverse(child, visitor);
            }
        }
    }
}

function traverseWithCancel(object, visitor)
{
    var key, child;

    if( visitor.call(null, object) )
    {
	    for (key in object) {
	        if (object.hasOwnProperty(key)) {
	            child = object[key];
	            if (typeof child === 'object' && child !== null) {
	                traverseWithCancel(child, visitor);
	            }
	        }
	    }
 	 }
}

function functionName( node )
{
	if( node.id )
	{
		return node.id.name;
	}
	return "";
}


if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number]
        : match
      ;
    });
  };
}

main();

