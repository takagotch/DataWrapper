<?php
  
class DatawrapperPlugin_D3BubbleChart extends DatawrapperPlugin {
  
  public function init(){
    $visMeta = array(
      "id" => "bubble-chart",
      "title" => "Buble Chart (d3)",
      "axes" => array(
        "label" => array(
	  "accepts" => array("text", "data")
        ),
        "size" => array(
	  "accepts" => array("number")
	)
      )
    );
    DatawrapperVisualization::register($this, $visMeta);
  }
}

>

