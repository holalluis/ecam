<?php
	/**SUMMARY FOR INPUTS OR OUTPUTS */

	if(!isset($_GET['type']))
		die('Error. type not specified<br>Try: <a href=summary.php?type=input>Inputs</a> or <a href=summary.php?type=output>Outputs</a>');
	
	//tipus de variable: inputs o outputs
	$type=$_GET['type'];

	//check correct $type value
	if($type!="input" && $type!="output" )
		die('Error. type must be "inputs" or "outputs"');

?>
<!doctype html><html><head>
	<meta charset=utf-8>
	<title>ECAM Web App</title>
	<link rel=stylesheet href="css.css"><style>
	</style>
	<script src="dataModel/info.js"></script><!--All variable descriptions and units object here-->
	<script src="dataModel/global.js"></script><!--Default Global object here-->
	<script src="js/cookies.js"></script>
	<script src="js/updateGlobalFromCookies.js"></script>
	<script>
		function init()
		{
			updateLevel1()
			updateLevel2()
			updateCounts()
			updateResult()
		}

		function updateLevel1()
		{
			var t=document.querySelector("[level='1']")
			while(t.rows.length>1)t.deleteRow(-1)
			t.innerHTML+=tableRows(Global.UWS,  "UWS", 	        "uws",   "edit.php?level=UWS")
			t.innerHTML+=tableRows(Global.Water,"Water Supply", "water", "edit.php?level=Water")
			t.innerHTML+=tableRows(Global.Waste,"Wastewater",   "waste", "edit.php?level=Waste")
		}
		function updateLevel2()
		{
			var t=document.querySelector("[level='2']")
			while(t.rows.length>1)t.deleteRow(-1)
			t.innerHTML+=tableRows(Global.Water.Abstraction,  "Water Abstraction",	  "waterAbs", "edit.php?level=Water&sublevel=Abstraction")
			t.innerHTML+=tableRows(Global.Water.Treatment,	  "Water Treatment",	  "waterTre", "edit.php?level=Water&sublevel=Treatment")
			t.innerHTML+=tableRows(Global.Water.Distribution, "Water Distribution",	  "waterDis", "edit.php?level=Water&sublevel=Distribution")
			t.innerHTML+=tableRows(Global.Waste.Collection,	  "Wastewater Collection","wasteCol", "edit.php?level=Waste&sublevel=Collection")
			t.innerHTML+=tableRows(Global.Waste.Treatment,	  "Wastewater Treatment", "wasteTre", "edit.php?level=Waste&sublevel=Treatment")
			t.innerHTML+=tableRows(Global.Waste.Discharge,	  "Wastewater Discharge", "wasteDis", "edit.php?level=Waste&sublevel=Discharge")
		}
		function updateCounts()
		{
			for(family in Global.General["Active Stages"])
			{
				var count=document.querySelectorAll("[family='"+family+"']").length
				if(count!=0)
					document.querySelector("[count='"+family+"']").innerHTML=count
			}
		}

		//** Create rows and columns for a table with specified object
		function tableRows(object,name,family,href)
		{
			//return string
			var ret="<tr><td colspan=4 style='background:#eee;font-weight:bold'><a href="+href+">"+name+"</a>"
			ret+=": <span count="+family+">0 (Inactive)</span>"
			//check if active
			if(Global.General["Active Stages"][family]==0)return ret
			//fill rows
			for(variable in object)
			{
				//only type specified
				<?php
					switch($type)
					{
						case "input":$typeof="number";break;
						case "output":$typeof="function";break;
					}
				?>
				if(typeof(object[variable])!="<?php echo $typeof?>")continue
				var description=Info[variable]?Info[variable].description:"<span style=color:#ccc>no description</span>"
				var unit=Info[variable]?Info[variable].unit:"<span style=color:#ccc>no unit</span>"
				ret+="<tr family='"+family+"'>"+
					"<td style='font-weight:bold'><a class=blue href=variable.php?id="+variable+">"+variable+"</a>"+
					"<td>"+description+
					"<td>"+object[variable]<?php if($type=="output")echo "()"?>+
					"<td>"+unit
			}
			return ret
		}
	</script>
</head><body onload=init()><center>
<!--NAVBAR--><?php include"navbar.php"?>
<!--YOU ARE HERE--><?php include"youAreHere.php"?>
<!--TITLE--><h2>ALL <?php echo strtoupper($type)?>S SUMMARY</h2>

<!--AVAILABLE INPUTS-->
<div class=inline style="width:75%;text-align:left">
	<h4>Enabled <?php echo $type?>s Sorted By Stage (Summary)</h4>
	<!--level 1-->
	<div class=inline style="font-size:11px;width:35%;padding:0">
		<table style="width:100%" level=1><tr><th colspan=4>Level 1</table>
	</div>
	<!--level 2-->
	<div class=inline style="font-size:11px;width:55%;padding:0">
		<table style="width:100%" level=2><tr><th colspan=4>Level 2</table>
	</div>
</div>

<!--CURRENT JSON--><?php include'currentJSON.php'?>
