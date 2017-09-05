<!doctype html><html><head>
	<?php include'imports.php'?>
	<script>
		function init() {
			calculateGHG();
			findCriticGHG();
			Caption.listeners();
			updateResult();

			//onclick listeners for substage counters: link to substages.php
			var tds=document.querySelectorAll('td.ss');
			for(var i=0;i<tds.length;i++){
				tds[i].onclick=function(){window.location='substages.php'}
			}
		}

		function calculateGHG() {
			//kg, kg per year, or kg per serviced population
			var divisor=(function() {
				var ret=1;//return value
				var select=document.querySelector('#ghg_divisor');
				switch(select.value) {
					case 'years':
						ret=Global.General.Years();
						break;
					case 'serv_pop':
						ret=function(firstTwoLetters) {
							var di=1;//divisor
							switch(firstTwoLetters) {
								case "ws":
									di=Global.Water.ws_serv_pop;
									break;
								case "ww":
									di=Global.Waste.ww_serv_pop;
									break;
								default:
									break;
							}
							return di;
						};
						break;
					default:
						break;
				}
				return ret;
			})();

			var fields=document.querySelectorAll('#sources [field]');
			for(var i=0;i<fields.length;i++) {
				var element=fields[i];
				var code=element.getAttribute('field');
				var divisor_value = typeof(divisor)=="function" ? divisor(code.substring(0,2)) : divisor;
				var loc=locateVariable(code);

				//check if variable is an input or an output
				var object=loc.sublevel ? Global[loc.level][loc.sublevel][code] : Global[loc.level][code];
				var value=0;
				if(typeof(object)=="function") {
					value=loc.sublevel ?
						Global[loc.level][loc.sublevel][code]()/divisor_value
						:
						Global[loc.level][code]()/divisor_value;
				}
				else {
					value=object/divisor_value;
				}
				element.innerHTML=format(value);
				element.setAttribute('value',value);
			}
		}

		function findCriticGHG() {
			var max=0;
			var critic=false;
			var fields=document.querySelectorAll('#sources td[field]');
			for(var i=0;i<fields.length;i++) {
				var value=parseFloat(fields[i].getAttribute('value'));
				if(value>max) {
					max=value;
					critic=fields[i].getAttribute('field');
				}
			}
			if(!critic)return;
			var element=document.querySelector("#sources td[field="+critic+"]");

			//CO2
			element.classList.add('critic');
			element.setAttribute('cap',"This is the highest Energy consumption of your system");

			//substages number
			element.previousSibling.classList.add('critic');
			element.previousSibling.setAttribute('caption',element.getAttribute('cap'));

			//name
			element.previousSibling.previousSibling.classList.add('critic');
			element.previousSibling.previousSibling.setAttribute('caption',element.getAttribute('cap'));
		}
	</script>
	<style>
		#sources td.ss {text-align:center;cursor:pointer} /*substages counter*/
		#sources td[field][level][sublevel]{padding-right:1em}
		#sources td[field][level][sublevel]:hover{background:rgba(64,83,109,0.2);transition:all 0.5s}
		#sources {
			box-shadow: 1px 1px 1px 1px rgba(0,0,0,.1);
		}
	</style>
</head><body onload=init()><center>
<?php
	include'sidebar.php';
	include'navbar.php';
	include'linear.php';
	include'caption.php';
?>
<!--title-->
<h1>
	<script>document.write(Global.General.Name)</script>
	&mdash; Energy consumption Summary (Overview)
</h1>
<h4>
	Assessment period:
	<b>
		<script>document.write(Global.General.Days())</script> days
		(<script>document.write(Global.General.Years())</script> years)
	</b>
</h4>

<!--content-->
<div style=width:66%;>

	<!--tab buttons-->
	<div class=tab_buttons>
		<button class=left onclick="tabs_show_tables()" id=tb_tables disabled>Tables</button>
		<button class=right onclick="tabs_show_graphs()" id=tb_graphs>Graphs</button>
		<script>
			function tabs_show_graphs(){
				document.getElementById('tables').style.display='none'
				document.getElementById('graph').style.display=''
				Graphs.graph5(false,'graph');
				// 'div.tab_buttons button.right' collides other tabs with tab_buttons classes
				// ADDED button ids - not tested completely
				document.querySelector('div.tab_buttons button#tb_graphs').setAttribute('disabled', true);
				document.querySelector('div.tab_buttons button#tb_tables').removeAttribute('disabled');
				// improvement list - #4 - graphs & tables switching
				//document.querySelector('div.tab_buttons button.right').setAttribute('disabled',true);
				//document.querySelector('div.tab_buttons button.left').removeAttribute('disabled');
			}
			function tabs_show_tables(){
				document.getElementById('tables').style.display=''
				document.getElementById('graph').style.display='none'
				document.querySelector('div.tab_buttons button#tb_tables').setAttribute('disabled', true);
				document.querySelector('div.tab_buttons button#tb_graphs').removeAttribute('disabled');
				// improvement list - #4 - graphs & tables switching
				//document.querySelector('div.tab_buttons button.right').removeAttribute('disabled');
				//document.querySelector('div.tab_buttons button.left').setAttribute('disabled',true);
			}
		</script>
	</div>

	<!--tables: left tab-->
	<div id=tables>
		<div>
			<table id=sources>
				<tr><td colspan=5 style=text-align:center>
					Energy consumption &mdash;
					<!--select divisor-->
					<select id=ghg_divisor onchange=init()>
						<option value=none>kWh
						<option value=years>kWh / Year
						<option value=serv_pop>kWh / Serviced population
					</select>
					<!--legend-->
					<span style=float:right>
						<span class=circle style=background:orange></span>
						highest energy consumption
					</span>
				<tr><th rowspan=9 style="font-weight:bold;background:lightgreen;color:black">TOTAL ENERGY CONSUMED<br><br><span field=TotalNRG>Loading...</span>

				<th rowspan=3>
					<a href="edit.php?level=Water" style=color:white>
						Water supply
						(<script>
						document.write(Global.Water.ws_serv_pop)
						</script> people)
					</a>
					<br><br><span field=ws_nrg_cons>Loading...</span>
				</th>
					<!--wsa-->
					<td><img src=img/waterAbs.png> <a href='edit.php?level=Water&sublevel=Abstraction'>Abstraction </a>
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Abstraction.length)</script>
						<td field=wsa_nrg_cons level=Water sublevel=Abstraction>Loading...

					<!--wst-->
					<tr><td><img src=img/waterTre.png> <a href='edit.php?level=Water&sublevel=Treatment'>Treatment   </a>
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Treatment.length)</script>
						<td field=wst_nrg_cons level=Water sublevel=Treatment>Loading...

					<!--wsd-->
					<tr><td><img src=img/waterDis.png> <a href='edit.php?level=Water&sublevel=Distribution'>Distribution</a>
						<td caption="Number of substages" class=ss><script>document.write(Substages.Water.Distribution.length)</script>
						<td field=wsd_nrg_cons level=Water sublevel=Distribution>Loading...

				<tr>

				<th rowspan=3 class=red>
					<a href="edit.php?level=Waste" style=color:white>
						Wastewater
						(<script>
						document.write(Global.Waste.ww_serv_pop)
						</script> people)
					</a>
					<br><br><span field=ww_nrg_cons>Loading...</span>
				</th>

					<!--wwc-->
					<td><img src=img/wasteCol.png> <a href='edit.php?level=Waste&sublevel=Collection'>Collection</a>
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Collection.length)</script>
						<td field=wwc_nrg_cons level=Waste sublevel=Collection>Loading...

					<!--wwt-->
					<tr><td><img src=img/wasteTre.png> <a href='edit.php?level=Waste&sublevel=Treatment'>Treatment </a>
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Treatment.length)</script>
						<td field=wwt_nrg_cons level=Waste sublevel=Treatment>Loading...

					<!--wwd-->
					<tr><td><img src=img/wasteDis.png> <a href='edit.php?level=Waste&sublevel=Discharge'>Discharge </a>
						<td caption="Number of substages" class=ss><script>document.write(Substages.Waste.Discharge.length)</script>
						<td field=wwd_nrg_cons level=Waste sublevel=Discharge>Loading...
				</tr>
			</table>
		</div>

		<style>
			@keyframes blink { from {background-color: white;} to {background-color: orange;} }
			table#sources .critic {
				color:black;
				font-weight:bold;
				animation:blink 3s ease 0.5s infinite alternate;
			}
			#sources a {color:black;font-weight:bold}
			table#sources td[field][value].critic:before {
				content:'\26a0 ';
				float:left;
				color:red;
			}
			table#sources{
				margin:10px 0;
				width:95%;
			}
			table#sources td {padding:1.2em 0.5em;max-width:70px}
			table#sources td[field] {text-align:right}
			table#sources img {vertical-align:middle;width:30px;margin-right:10px}
		</style>
	</div>

	<!--graph: right tab-->
	<div id=graph style=display:none>Loading...</div>

</div>
<!--CURRENT JSON--><?php include'currentJSON.php'?>
<script>
	google.charts.load('current',{'packages':['corechart','gauge','bar']});
</script>
