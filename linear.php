<style>
	#linearDiagram {background:#f6f6f6;border-bottom:1px solid #ccc;padding:0.4em 0 0.4em 0}
	#linearDiagram > div {
		font-size:12px;
		vertical-align:middle;
		transition:background 0.2s;
		display:inline-block;
		padding:0.2em;
		margin-right:-1px;
		margin-left:5px;
		border-radius:0.5em;
		box-shadow: 0 1px 2px rgba(0,0,0,.1);
	}
	#linearDiagram > div:hover {
		background:#e6e6e6;
	}
	#linearDiagram img {position:relative;z-index:2;vertical-align:middle;padding:0} /*icons inside buttons to navigate to Level2*/
	#linearDiagram img.l1 {width:42px;} 
	#linearDiagram img.l2 {width:42px;}
	#linearDiagram img{border-radius:90%;border:4px solid transparent}
	#linearDiagram img.selected{border:4px solid lightgreen}
	#linearDiagram img.inactive {pointer-events:none;}
	#linearDiagram img:not(.inactive) {cursor:pointer}
	#linearDiagram a:hover {text-decoration:none}
</style>

<div id=linearDiagram>
	<!--general info-->
	<div 
		style=cursor:pointer
		onclick=window.location="getStarted.php">
		<div><a href=getStarted.php style="color:#666"><?php write('#getStarted_general_info')?></a></div>
		<img class=l1 stage=gets src=img/getStarted.png caption="<?php write('#getStarted_general_info')?>">
	</div>

	<!--configuration-->
	<div 
		style=cursor:pointer
		onclick=window.location="configuration.php">
		<div><a href=configuration.php style="color:#666"><?php write('#configuration')?></a></div>
		<img class=l1 stage=conf src=img/dashboard.png caption="<?php write('#configuration')?>">
	</div>

	<!--inhabitants-->
	<div 
		style=cursor:pointer
		onclick=window.location="inhabitants.php">
		<div><a href=inhabitants.php style="color:#666">Population</a></div>
		<img class=l1 stage=inha src=img/inhabitants.png caption="Population">
	</div>

	<!--GLOBAL-->
	<div
		style=cursor:pointer
		onclick=window.location="birds.php">
		<div><a href=birds.php style="color:#666"><?php write('#quick_assessment')?></a></div>
		<img class=l1 stage=birds src=img/birds.png caption="<?php write('#quick_assessment')?>">
	</div>

	<!--DETAILED-->
	<div>
		<div><span style="color:#666"><?php write('#energy_performance')?></span></div>
		<img class=l2 stage=waterAbs src=img/waterAbs.png onclick=window.location="edit.php?level=Water&sublevel=Abstraction"  caption="<?php write('#Abstraction')?>" >
		<img class=l2 stage=waterTre src=img/waterTre.png onclick=window.location="edit.php?level=Water&sublevel=Treatment"    caption="<?php write('#Treatment')?>">
		<img class=l2 stage=waterDis src=img/waterDis.png onclick=window.location="edit.php?level=Water&sublevel=Distribution" caption="<?php write('#Distribution')?>">
		<img class=l2 stage=wasteCol src=img/wasteCol.png onclick=window.location="edit.php?level=Waste&sublevel=Collection"   caption="<?php write('#Collection')?>">
		<img class=l2 stage=wasteTre src=img/wasteTre.png onclick=window.location="edit.php?level=Waste&sublevel=Treatment"    caption="<?php write('#Treatment')?>">
		<img class=l2 stage=wasteDis src=img/wasteDis.png onclick=window.location="edit.php?level=Waste&sublevel=Discharge"    caption="<?php write('#Discharge')?>">
	</div>

	<!--Stages Summaries-->
	<div>
		<div><span style="color:#666">GHG Summary</span></div>
		<img class=l1 stage=water   src=img/water.png   onclick=window.location="edit.php?level=Water" caption="<?php write('#Water')?>"> 
		<img class=l1 stage=waste   src=img/waste.png   onclick=window.location="edit.php?level=Waste" caption="<?php write('#Waste')?>"> 
		<img class=l1 stage=sources src=img/sources.png onclick=window.location="sources.php"          caption="GHG Sources">
	</div>

	<!--I/O Summary-->
	<div>
		<div><span style="color:#666">I/O Summary</span></div>
		<img class=l1 stage=io src=img/io.png onclick=window.location="summary.php?type=input"    caption="I/O Summary">
	</div>

	<!--Energy Summaries-->
	<div>
		<div><span style="color:#666">Energy Summary</span></div>
		<img class=l1 stage=energy src=img/energy.png onclick=window.location="edit.php?level=Energy" caption="<?php write('#energy_summary')?>"> 
	</div>

</div>

<script>
	<?php
		//highlight current stage
		//only if currently we are in edit.php or level3.php
		if(strpos($_SERVER['PHP_SELF'],"edit.php") || strpos($_SERVER['PHP_SELF'],"level3.php"))
		{ ?>
			(function()
			{
				//we need to find level and sublevel to create a stage name i.e. "waterAbs"
				var level    = '<?php echo $level?>';
				var sublevel = '<?php echo $sublevel?>';
				var stage;
				switch(level)
				{
					case "Water":
						switch(sublevel)
						{
							case "Abstraction":stage="waterAbs";break;
							case "Treatment":stage="waterTre";break;
							case "Distribution":stage="waterDis";break;
							default:stage="water";break;
						}
						break;

					case "Waste":
						switch(sublevel)
						{
							case "Collection":stage="wasteCol";break;
							case "Treatment":stage="wasteTre";break;
							case "Discharge":stage="wasteDis";break;
							default:stage="waste";break;
						}
						break;

					case "Energy":
						stage="energy";break;

					default: 
						stage=false;
						break;
				}
				if(stage) { document.querySelector('img[stage='+stage+']').classList.add('selected') }
			})();
			<?php 
		}
		//hl birds if we are in birds eye view
		if(strpos($_SERVER['PHP_SELF'],"birds.php"))
		{ ?>document.querySelector('img[stage=birds]').classList.add('selected');<?php }
		//hl configuration if we are in configuration
		if(strpos($_SERVER['PHP_SELF'],"configuration.php"))
		{ ?>document.querySelector('img[stage=conf]').classList.add('selected');<?php }
		//hl sources if we are in sources.php
		if(strpos($_SERVER['PHP_SELF'],"sources.php"))
		{ ?>document.querySelector('img[stage=sources]').classList.add('selected');<?php }
		//hl inhabitants
		if(strpos($_SERVER['PHP_SELF'],"inhabitants.php"))
		{ ?>document.querySelector('img[stage=inha]').classList.add('selected');<?php }
	?>

	//go over icon images to deactivate inactives --> do in PHP better?
	(function()
	{
		var collection=document.querySelectorAll("#linearDiagram img[stage]");
		for(var i=0;i<collection.length;i++)
		{
			var stage = collection[i].getAttribute('stage');
			if(["birds","energy","conf",'sources','gets','inha','io'].indexOf(stage)>=0) continue;
			var isActive = Global.Configuration.ActiveStages[stage];
			if(!isActive)
			{
				collection[i].src="img/"+stage+"-off.png";
				collection[i].classList.add('inactive');
			}
		}
	})();
</script>
