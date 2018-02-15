(function () {

  dw.visualization.register('buble-chart', {
    
    render: function($element, dataset, axes, theme, chart){
      var data = { children: [] };
      dataset.eachRow(function(i){
        data.children.push({
	  label: axes.label.val(i),
          value: axes.size.val(i)
	});
      });

      var size = this.size(),
		    diameter = Math.min(size[0], size[1]),
		    format = d3.format(",d");

       var buble = d3.layout.pack()
	    .sort(null)
	    .size([diameter, diameter])
	    .padding(1.5);

       var vis = d3.select($element.get(0)).append("svg")
	    .attr("width", diameter)
	    .attr("height", diameter)
	    .style("margin-left", (size[0] - diameter) / 2)
	    .attr("class", "bubble");

       var node = vis.selectAll("g.node")
	    .data(bubble.nodes(data)
	      .filter(function(d) { return !d.children; }))
       .enter().append("g")
	    .attr("class", function(d){
	      return chart.isHighlighted(d.label) ? "node highlighted" : "node";
	    });
	    .attr("transform", function(d){
	      return "translate(" + d.x + "," + d.y + ")";
	    });

        node.append("title")
	    .text(function(d){
	      return d.label + ": " + format(d.value);
	    });

	node.append("circle")
	    .attr("r", function(d) { return d.r; })
	    .style("fill", theme.colors.palette[0]);

	if(this.get('show-labels')){
	  node.append("text")
		.attr("text-anchor", "middle")
		.attr("dy", ".3em")
		.attr("class", function(d){
		  return d3.lab(theme.colors.palette[0]).1 < 80 ? "inverted" : "";
		});
		.text(function(d){
		  return d.label.substring(0, d.r / 5);
		});
	}
    }
  });

}).call(this);

