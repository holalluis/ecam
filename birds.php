<!doctype html><html><head>
	<?php include'imports.php'?>
	<style>
		body {background:#F5ECCE}
		h1{background:white;border-bottom:1px solid #ccc}
		/*
			legend colors for graphs
		*/
		span.circle{display:none}
		span.circle{float:right}
	</style>
	<script>
		function init()
		{
			BEV.showActive();
			BEV.updateDefaults();
			drawCharts();
			updateResult();

			//first input click
			var first=document.querySelector('#inputs input[id]');
			if(first.value=="0") first.click()
		}

		function drawCharts()
		{
			Graphs.graph4(false,'graph1');
			Graphs.graph2(false,'graph2');
			Graphs.ws_cost('graph3');
			Graphs.ww_cost('graph4');
			Graphs.gauge('graph5', Global.Water.ws_SL_serv_pop()||0, translate("ws_SL_serv_pop_descr"));
			Graphs.gauge('graph6', Global.Waste.ww_SL_serv_pop()||0, translate("ww_SL_serv_pop_descr"));
			Graphs.gauge('graph7', Global.Water.ws_SL_non_revw()||0, translate("ws_SL_non_revw_descr"));
			Graphs.gauge('graph8', Global.Water.ws_SL_auth_con()||0, translate("ws_SL_auth_con_descr"),Info.ws_SL_auth_con.unit);
		}

		var BEV={}; //'Birds Eye View' namespace

		//Generic f for updating internal values
		BEV.update=function(obj,field,newValue)
		{
			if(obj[field]===undefined) { alert('field '+field+' undefined'); return; }
			//newValue may be a string from input.value, it should be a float
			newValue=parseFloat(newValue);
			obj[field]=newValue;
		}

		//Specific behaviour for each formula when user inputs data
		BEV.updateField=function(input)
		{
			//get info from the input element
			var field = input.id;
			var value = parseFloat(input.value.replace(",","")); //replace commmas for copy paste easyness

			value*=Units.multiplier(field);

			//if value is not a number, set to zero
			if(isNaN(value))value=0;

			//get L1 name: "Water" or "Waste"
			var L1 = field.search("ws")==0 ? "Water" : "Waste";
			var L2 = false;
			L2 = field.search("wsa_")==0 ? "Abstraction"  : L2;
			L2 = field.search("wst_")==0 ? "Treatment"    : L2;
			L2 = field.search("wsd_")==0 ? "Distribution" : L2;
			L2 = field.search("wwc_")==0 ? "Collection"   : L2;
			L2 = field.search("wwt_")==0 ? "Treatment"    : L2;
			L2 = field.search("wwd_")==0 ? "Discharge"    : L2;

			//update
			if(L2)
				this.update(Global[L1][L2],field,value);
			else
				this.update(Global[L1],field,value);
				
			//add a color to the field
			input.classList.add('edited');
			init();
		}

		//Display default values from the table
		BEV.updateDefaults=function()
		{
			var inputs = document.querySelectorAll('#inputs input');
			for(var i=0; i<inputs.length; i++)
			{
				var input = inputs[i];
				var field = input.id; 

				//set the longer description in the input <td> element
				input.parentNode.parentNode.childNodes[0].title=translate(field+'_expla');

				var L1 = field.search("ws")==0 ? "Water" : "Waste";
				var L2 = false;
				L2 = field.search("wsa_")==0 ? "Abstraction"  : L2;
				L2 = field.search("wst_")==0 ? "Treatment"    : L2;
				L2 = field.search("wsd_")==0 ? "Distribution" : L2;
				L2 = field.search("wwc_")==0 ? "Collection"   : L2;
				L2 = field.search("wwt_")==0 ? "Treatment"    : L2;
				L2 = field.search("wwd_")==0 ? "Discharge"    : L2;

				//the value we are going to put in the input
				var value = L2 ? Global[L1][L2][field] : Global[L1][field];
				if(typeof(value)=="function"){
					var value = L2 ? Global[L1][L2][field]() : Global[L1][field]();
				}
				if(!value)value=0;
				value/=Units.multiplier(field);
				//set the value
				input.value=format(value);
			}
		}

		BEV.showActive=function() //only show water/wastewater inputs if active
		{
			['water','waste'].forEach(function(stage)
			{
				if(Global.Configuration.ActiveStages[stage]==1)
				{
					//show all rows with stage=stage
					var rows = document.querySelectorAll('#inputs tr[stage='+stage+']');
					for(var i=0; i<rows.length; rows[i++].classList.remove('hidden')){}
				}
				else //show "Stage not active"
				{
					document.querySelector('table#inputs tr[indic='+stage+']').classList.remove('hidden');
				}
			});
		}

		function makeInactive(input)
		{
			input.setAttribute('disabled',true)
			input.style.background="#eee"
			var tr = input.parentNode.parentNode;
			tr.style.background="#eee"
			tr.title="<?php write('#Inactive')?>"
			tr.style.color="#888"
		}
	</script>
</head><body><center>
<!--sidebar--><?php include'sidebar.php'?>
<!--NAVBAR--><?php include"navbar.php"?>
<!--linear--><?php include'linear.php'?>
<!--TITLE--><h1><?php write('#quick_assessment')?> 
	<div style="font-size:13px;color:#666;margin-top:5px">
		<span><a href=variable.php?id=Days>        <?php write('#assessment_period')?></a>: <script>document.write(Global.General.Days())</script> <?php write('#days')?></span> 
		·
		<span><a href=variable.php?id=conv_kwh_co2><?php write('#conversion_factor')?></a>: 
			<script>
				(function(){
					var c = Global.General.conv_kwh_co2;
					var str = c==0 ? "<span style='padding:0 0.5em 0 0.5em;background:red;cursor:help' title='<?php write('#birds_warning_conv_factor')?>'>"+format(c)+" &#9888;</span>" : format(c); 
					document.write(str)
				})();
			</script> kg CO<sub>2</sub>/kWh
		</span> 
	</span>
</h1></center>

<!--content-->
<div>
	<!--inputs-->
	<div class="card inline" style="width:35%;"><?php cardMenu("Inputs &mdash; Global values of the system")?>
		<!--table-->
		<table id=inputs style=width:100%>
			<style>
				table#inputs th, #inputs td {text-align:left;}
				#inputs th, #inputs td {border-left:none;border-right:none}
				#inputs input.edited {background:lightgreen;}
				#inputs td.input, #inputs td.output {
					width:70px;
					border:1px solid #aaa;
					color:#666;
					background:#eee;
					padding:0 !important;
				}
				#inputs input {
					background:inherit;
					border:none;
					text-align:right;
					cursor: cell;
					line-height:1em;
					width:95%;
					height:24px;
					display:block;
					padding:0.2em;
				}
				#inputs input:focus {
					background:white;
				}
				#inputs tr.hidden {display:none}
				/**indication "not active"**/
				#inputs tr[indic]{text-align:center;color:#999;background:#eee}
			</style>

			<script>
				BEV.updateOutput=function(input)
				{
					var field=input.id;
					var value=parseFloat(input.value)*Units.multiplier(field);
					//spred the value among the stages
					//get L1 name: "Water" or "Waste"
					var L1=field.search("ws_")==0 ? "Water" : "Waste";
					if(L1=="Water")
					{
						//count active stages
						var wsa=Global.Configuration.ActiveStages.waterAbs;
						var wst=Global.Configuration.ActiveStages.waterTre;
						var wsd=Global.Configuration.ActiveStages.waterDis;
						var n=wsa+wst+wsd;
						Global.Water.Abstraction [field.replace("ws_","wsa_")]=wsa*value/n;
						Global.Water.Treatment   [field.replace("ws_","wst_")]=wst*value/n;
						Global.Water.Distribution[field.replace("ws_","wsd_")]=wsd*value/n;
					}
					else if(L1=="Waste")
					{
						//count active stages
						var wwc=Global.Configuration.ActiveStages.wasteCol;
						var wwt=Global.Configuration.ActiveStages.wasteTre;
						var wwd=Global.Configuration.ActiveStages.wasteDis;
						var n=wwc+wwt+wwd;
						Global.Waste.Collection[field.replace("ww_","wwc_")]=wwc*value/n;
						Global.Waste.Treatment [field.replace("ww_","wwt_")]=wwt*value/n;
						Global.Waste.Discharge [field.replace("ww_","wwd_")]=wwd*value/n;
					}
					input.classList.add('edited');
					init();
				}
			</script>

			<!--WATER-->
			<tr><th colspan=3>
				<img src=img/water.png width=25 style="line-height:4em;vertical-align:middle"><?php write('#Water')?>
				<tr stage=water class=hidden><td>Energy consumed from the grid<td class=output><input id='ws_nrg_cons' onchange="BEV.updateOutput(this)"><td><script>document.write(Info['ws_nrg_cons'].unit)</script>
				<tr stage=water class=hidden><td>Volume of fuel consumed<td class=output><input id='ws_vol_fuel' onchange="BEV.updateOutput(this)"><td><script>document.write(Info['ws_vol_fuel'].unit)</script>
				<tr stage=water class=hidden> <td>Total water abstracted <td class=input><input id='wsa_vol_conv' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>
				<tr stage=water class=hidden><td><?php write('#birds_ws_vol_auth')?> <td class=input><input id='wsd_auth_con' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>
				<tr stage=water class=hidden><td><?php write('#birds_ws_nrg_cost')?> <td class=input><input id='ws_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr stage=water class=hidden><td><?php write('#birds_ws_run_cost')?> <td class=input><input id='ws_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr indic=water class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
			<!--WASTEWATER-->
			<tr><th colspan=3 style=background:#d71d24>
				<img src=img/waste.png width=25 style="line-height:4em;vertical-align:middle"> <?php write('#Waste')?>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_vol_wwtr')?><td class=input><input id='ww_vol_wwtr' onchange="BEV.updateField(this)"> <td>m<sup>3</sup>
					<span class=circle style=background:#89375c></span>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_nrg_cost')?><td class=input><input id='ww_nrg_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_run_cost')?><td class=input><input id='ww_run_cost' onchange="BEV.updateField(this)"> <td><script>document.write(Global.General.Currency)</script>
				<tr stage=waste class=hidden>
					<td><?php write('#birds_ww_n2o_effl')?> 
					<td class=input><input id='ww_n2o_effl' onchange="BEV.updateField(this)"> <td>mg/L
						<span class=circle style=background:#b8879d></span>
				<tr stage=waste class=hidden><td><?php write('#birds_ww_prot_con')?>
					<td class=input><input id='ww_prot_con' onchange="BEV.updateField(this)"> <td>kg/person/<?php write('#birds_year')?>
					<span class=circle style=background:#451c2e></span>

				<tr stage=waste class=hidden><td>
					<?php write("#producing_biogas")?>?
					<td>
						<label><?php write("#no")?>  
							<input name=producing_biogas ans=0 type=radio onclick="Global.Configuration['Yes/No'].producing_biogas=0;init()">
						</label>
					<td>
						<label><?php write("#yes")?> 
							<input name=producing_biogas ans=1 type=radio onclick="Global.Configuration['Yes/No'].producing_biogas=1;init()">
						</label>
						<script>
							(function(){
								var ans=Global.Configuration['Yes/No'].producing_biogas;
								document.querySelector('input[name=producing_biogas][ans="'+ans+'"]').checked=true;
							})();
						</script>
					<span class=circle style=background:#b8879d></span>
				<tr stage=waste class=hidden><td>
					<?php write("#valorizing_biogas")?>?
					<td>
						<label><?php write("#no")?>
						<input name=valorizing_biogas ans=0 type=radio onclick="Global.Configuration['Yes/No'].valorizing_biogas=0;init()">
						</label>
					<td>
						<label><?php write("#yes")?>
						<input name=valorizing_biogas ans=1 type=radio onclick="Global.Configuration['Yes/No'].valorizing_biogas=1;init()">
						</label>
					<script>
						(function(){
							var ans = Global.Configuration['Yes/No'].valorizing_biogas;
							document.querySelector('input[name=valorizing_biogas][ans="'+ans+'"]').checked=true;
						})();
					</script>
					<span class=circle style=background:#b8879d></span>
				<tr indic=waste class=hidden><td colspan=3><?php write('#birds_stage_not_active')?>
		</table>

		<script>
			(function(){
				var inputs = document.querySelectorAll("#inputs input")
				for(var i=0;i<inputs.length;i++)
				{
					if(inputs[i].type=="radio") continue;
					inputs[i].onclick=function(){this.select()}
				}
			})()
		</script>
	</div>

	<!--graphs-->
	<div class="card inline" style="width:63%"><?php cardMenu($lang_json['#graphs'])?>
		<div id=graphs>
			<style> 
				#graphs table{margin:auto !important;margin-bottom:0.5em !important}
				#graphs button{margin:0.5em;margin-top:0;font-size:10px} 
				#graphs div div {text-align:center;position:relative} 
				#graphs div.options {text-align:center;padding:1em}
				#graphs div[graph] {
					display:inline-block;
					text-align:center;
					vertical-align:top;
					width:50%;
					margin-left:-5px;
					margin-bottom:-1px;
					border:1px solid #ddd;
					padding:0;
				}
			</style>

			<div style=text-align:center>
				<div graph id=graph1><?php write('#loading')?></div>
				<div graph id=graph2><?php write('#loading')?></div>
				<!---->
				<div graph id=graph3><?php write('#loading')?></div>
				<div graph id=graph4><?php write('#loading')?></div>
				<div graph id=graph5><?php write('#loading')?></div>
				<div graph id=graph6><?php write('#loading')?></div>
				<!---->
				<div graph id=graph7><?php write('#loading')?></div>
				<div graph id=graph8><?php write('#loading')?></div>
				<!---->
				<div style="width:98%;padding:1em 0;margin-bottom:1em;border:none">
					For further details on energy consumption &amp; opportunities to reduce GHG emissions go to 
					<b>Detailed GHG Assessment</b> (<a href=#>&uarr;</a>)
				</div>
				<script>
					(function(){
						//hide inactive graphs
						if(Global.Configuration.ActiveStages.water==0)
						{
							document.querySelector("#graph3").style.display="none"
							document.querySelector("#graph5").style.display="none"
							document.querySelector("#graph7").style.display="none"
							document.querySelector("#graph8").style.display="none"
						}
						if(Global.Configuration.ActiveStages.waste==0)
						{
							document.querySelector("#graph4").style.display="none"
							document.querySelector("#graph6").style.display="none"
						}
					})();
				</script>
			</div>
			<script>
				google.charts.load('current',{'packages':['corechart','gauge']});
				google.charts.setOnLoadCallback(init)
			</script>
		</div>
	</div>

	<!--PREV & NEXT BUTTONS-->
	<div style=margin:1em;text-align:center> 
		<script>
			//find first available stage to start entering data
			function nextPage()
			{
				event.stopPropagation();
				//go to first active substage
				var location;
				if(Global.Configuration.ActiveStages.waterAbs)
					location = "edit.php?level=Water&sublevel=Abstraction";
				else if(Global.Configuration.ActiveStages.waterTre)
					location = "edit.php?level=Water&sublevel=Treatment";
				else if(Global.Configuration.ActiveStages.waterDis)
					location = "edit.php?level=Water&sublevel=Distribution";
				else if(Global.Configuration.ActiveStages.wasteCol)
					location = "edit.php?level=Waste&sublevel=Collection";
				else if(Global.Configuration.ActiveStages.wasteTre)
					location = "edit.php?level=Waste&sublevel=Treatment";
				else if(Global.Configuration.ActiveStages.wasteDis)
					location = "edit.php?level=Waste&sublevel=Discharge";
				else if(Global.Configuration.ActiveStages.water)
					location = "edit.php?level=Water";
				else if(Global.Configuration.ActiveStages.waste)
					location = "edit.php?level=Waste";
				else
				{
					alert("<?php write('#configuration_active_stages_error')?>");
					return;
				}
				window.location=location;
			}
		</script>
		<button class="button prev" onclick="event.stopPropagation();window.location='inhabitants.php'"><?php write('#previous')?></button><!--
		--><button class="button next" onclick=nextPage()><?php write('#next')?></button>
	</div>
</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
