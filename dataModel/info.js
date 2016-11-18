/** 
*
	Info: one-level-depth object that stores magnitudes and units for all inputs and outputs
		descriptions in english are inside languages/en.php
		descriptions in spanish are inside languages/es.php

	Format:
		"code": { "magnitude": string, "unit": string }
*/

var Info = {
	//GENERAL
	"Days":{magnitude:"Time",unit:"days",},
	"Years":{magnitude:"Time",unit:"years",},
	"conv_kwh_co2":{magnitude:"Conversion",unit:"kgCO2e/kWh",},
	
	/* +================+ */
	/* | Service levels | */
	/* +================+ */
	//Water Supply
	ws_SL_serv_pop :{magnitude:"Percentage",unit:"%",},
	ws_SL_non_revw :{magnitude:"Percentage",unit:"%",},	
	ws_SL_auth_con :{magnitude:"Volume/inhab/time",unit:"L/serv.pop./day",},
	ws_SL_nrg_cost :{magnitude:"Percentage",unit:"%",},
	ws_SL_nrw_emis :{magnitude:"Mass",unit:"kgCO2e"},
	ws_SL_auc_emis :{magnitude:"Mass",unit:"kgCO2e"},

	//Wastewater
	ww_SL_serv_pop :{magnitude:"Percentage",unit:"%",},
	ww_SL_treat_m3 :{magnitude:"Percentage",unit:"%",},
	ww_SL_dilution :{magnitude:"Percentage",unit:"%",},
	ww_SL_vol_pday :{magnitude:"Volume/inhab/time",unit:"L/serv.pop./day",},
	ww_SL_nrg_cost :{magnitude:"Percentage",unit:"%",},
	ww_SL_dil_emis :{magnitude:"Mass",unit:"kgCO2e"},

	//L1 Water Supply
	"ws_resi_pop":{magnitude:"People",unit:"People",},
	"ws_serv_pop":{magnitude:"People",unit:"People",},
	"ws_vol_auth":{magnitude:"Volume",unit:"m3",},
	"ws_nrg_cons":{magnitude:"Energy",unit:"kWh",},
	"ws_nrg_cost":{magnitude:"Currency",unit:"USD",},
	"ws_run_cost":{magnitude:"Currency",unit:"USD",},
	"ws_vol_fuel":{magnitude:"Volume",unit:"L",},
	ws_KPI_GHG_elec:{magnitude:"Mass",unit:"kgCO2e",},
	ws_KPI_GHG_ne:{magnitude:"Mass",unit:"kgCO2e",},
	ws_KPI_GHG :{magnitude:"Mass",unit:"kgCO2e",},

	//L1 Wastewater
	"ww_bod_infl" :{magnitude:"Mass",unit:"kg",},
	"ww_bod_effl" :{magnitude:"Mass",unit:"kg",},
	"ww_bod_slud" :{magnitude:"Mass",unit:"kg",},
	"ww_nrg_cost" :{magnitude:"Currency",unit:"USD",},
	"ww_run_cost" :{magnitude:"Currency",unit:"USD",},
	"ww_nrg_cons" :{magnitude:"Energy",unit:"kWh",},
	"ww_vol_coll" :{magnitude:"Volume",unit:"m3",},
	"ww_vol_wwtr" :{magnitude:"Volume",unit:"m3",},
	"ww_resi_pop" :{magnitude:"People",unit:"People",},
	"ww_conn_pop" :{magnitude:"People",unit:"People",},
	"ww_serv_pop" :{magnitude:"People",unit:"People",},
	"ww_num_trip" :{magnitude:"Number",unit:"Number",},
	"ww_dist_dis" :{magnitude:"Distance",unit:"km",},
	"ww_n2o_effl" :{magnitude:"Mass",unit:"kg",},
	"ww_vol_fuel" :{magnitude:"Volume",unit:"L",},
	"ww_prot_con" :{magnitude:"Annual per capita consumption",unit:"kg/person/year",},
	"ww_bod_pday" :{magnitude:"Mass/inhab/time",unit:"g/person/day",},
	"ww_ch4_efac" :{magnitude:"Mass/Mass",unit:"kgCH<sub>4</sub>/kgBOD",},
	"ww_biog_pro":{magnitude:"Volume",unit:"Nm3",},
	"ww_biog_val":{magnitude:"Volume",unit:"m3",},
	c_ww_biogas_flar :{magnitude:"Volume",unit:"Nm3",},
	c_ww_nrg_engines :{magnitude:"Energy",unit:"TJ",},
	c_ww_nrg_tsludge :{magnitude:"Energy",unit:"TJ",},
	c_ww_in_dilution:{magnitude:"Volume",unit:"m3",},
	ww_KPI_GHG_elec  :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG_ne_ch4_wwt :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG_ne_n2o_tre :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG_ne_tsludge :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG_ne_ch4_unt :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG_ne_n2o_unt :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG_ne_engines :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG_ne :{magnitude:"Mass",unit:"kgCO2e",},
	ww_KPI_GHG:{magnitude:"Mass",unit:"kgCO2e",},

	//L1 ENERGY SUMMARY 
		//Water Supply
			wsg_KPI_nrg_cons:{magnitude:"Energy",unit:"kWh",},
			wsg_KPI_nrg_x_ye:{magnitude:"Energy/Time",unit:"kWh/year",},
			wsg_KPI_nrg_x_ys:{magnitude:"Energy/Time/People",unit:"kWh/year/person",},
			wsg_KPI_nrg_x_m3:{magnitude:"Energy/Volume",unit:"kWh/m3",},
			wsg_KPI_std_nrg_:{magnitude:"Energy/Headloss",unit:"kWh/m3/100",},
		//Wastewater
			wwg_KPI_nrg_cons:{magnitude:"Energy",unit:"kWh",},
			wwg_KPI_nrg_x_ye:{magnitude:"Energy/Time",unit:"kWh/year",},
			wwg_KPI_nrg_x_ys:{magnitude:"Energy/Time/People",unit:"kWh/year/person",},
			wwg_KPI_nrg_x_br:{magnitude:"Energy/Mass",unit:"kWh/kg",},
			wwg_KPI_std_nrg_:{magnitude:"Energy/Headloss",unit:"kWh/m3/100",},
			wwg_KPI_nrg_perc:{magnitude:"Percentage",unit:"%",},

	//L2 Water Abstraction
	"wsa_nrg_cons":{magnitude:"Energy",unit:"kWh",},
	"wsa_vol_conv":{magnitude:"Volume",unit:"m3",},
	"wsa_nrg_turb":{magnitude:"Energy",unit:"kWh",},
	"wsa_vol_pump":{magnitude:"Volume",unit:"m3",},
	"wsa_vol_fuel":{magnitude:"Volume",unit:"L",},
	wsa_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wsa_KPI_nrg_recovery:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wsa_KPI_std_nrg_cons:{magnitude:"Energy",unit:"kWh/m<sup>3</sup>/100m",},
	"wsa_pmp_head":{magnitude:"Head",unit:"m",},
	"wsa_wat_loss":{magnitude:"Volume",unit:"m3",},
	"wsa_main_len":{magnitude:"Distance",unit:"km",},
	"wsa_fri_loss":{magnitude:"Head",unit:"m",},
	c_wsa_vol_head:{magnitude:"Volume x Head",unit:"m<sup>3</sup> x 100m",},
	wsa_KPI_std_elec_eff:{magnitude:"Percentage",unit:"%"},
	wsa_KPI_water_losses:{magnitude:"Volume/Distance",unit:"m<sup>3</sup>/km",},
	wsa_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km",},
	wsa_KPI_GHG_elec:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e",},
	wsa_KPI_GHG_ne:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e",},
	wsa_KPI_GHG:{magnitude:"Mass",unit:"kg CO<sub>2</sub>e",},
  wsa_nrg_per_pmp_watr:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>"},

	//L2 Water Treatment
	"wst_vol_trea":{magnitude:"Volume",unit:"m3",},
	"wst_nrg_cons":{magnitude:"Energy",unit:"kWh",},
	"wst_tst_carr":{magnitude:"Number",unit:"number",},
	"wst_tst_aest":{magnitude:"Number",unit:"number",},
	"wst_tst_micr":{magnitude:"Number",unit:"number",},
	"wst_tst_phch":{magnitude:"Number",unit:"number",},
	"wst_tst_radi":{magnitude:"Number",unit:"number",},
	"wst_mass_slu":{magnitude:"Mass",unit:"kg",},
	"wst_trea_cap":{magnitude:"Volume",unit:"m3",},
  "wst_treatmen":{magnitude:"Technology",unit:"Technology",},
	"wst_t_PCFSFD":{magnitude:"Volume",unit:"m3",},	
	wst_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wst_KPI_slu_per_m3:{magnitude:"Mass/Volume",unit:"kg/m<sup>3</sup>",},
	wst_KPI_capac_util:{magnitude:"Percent",unit:"%",},
	wst_SL_qual_com :{magnitude:"Percentage",unit:"%",},

	//L2 Water Distribution
	"wsd_nrg_cons" :{magnitude:"Energy",unit:"kWh",},
	"wsd_vol_dist" :{magnitude:"Volume",unit:"m3",},
	"wsd_auth_con" :{magnitude:"Volume",unit:"m3",},
	"wsd_deli_pts" :{magnitude:"Number",unit:"number",},
	"wsd_ser_cons" :{magnitude:"Number",unit:"number",},
	"wsd_time_pre" :{magnitude:"% Time",unit:"hours/day",},
	"wsd_min_pres" :{magnitude:"Pressure",unit:"m",},
	"wsd_hi_no_el" :{magnitude:"Distance",unit:"m asl",},
	"wsd_lo_no_el" :{magnitude:"Distance",unit:"m asl",},
	"wsd_av_no_el" :{magnitude:"Distance",unit:"m asl",},
	"wsd_wt_el_no" :{magnitude:"Distance",unit:"m",},
	"wsd_vol_pump" :{magnitude:"Volume",unit:"m3",},
	"wsd_pmp_head" :{magnitude:"Head",unit:"m",},
	"wsd_nrg_recv" :{magnitude:"Energy",unit:"kWh",},
	"wsd_main_len" :{magnitude:"Distance",unit:"km",},
	"wsd_fri_loss" :{magnitude:"Head",unit:"m",},
	wsd_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wsd_SL_pres_ade :{magnitude:"Percentage",unit:"%",},
	wsd_SL_cont_sup :{magnitude:"Percentage",unit:"%",},
	c_wsd_nrg_natu:{magnitude:"Energy",unit:"kWh",},
	c_wsd_nrg_mini:{magnitude:"Energy",unit:"kWh",},
	c_wsd_nrg_supp:{magnitude:"Energy",unit:"kWh",},
	c_wsd_nrg_topo:{magnitude:"Energy",unit:"kWh",},
	c_wsd_vol_head:{magnitude:"Volume x head",unit:"m<sup>3</sup> x100m",},
	wsd_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m",},
	wsd_KPI_nrg_efficien:{magnitude:"Percent",unit:"%",},
	wsd_KPI_nrg_topgraph:{magnitude:"Percent",unit:"%",},
	wsd_KPI_water_losses:{magnitude:"Volume/Distance",unit:"m<sup>3</sup>/km",},
	wsd_KPI_un_head_loss:{magnitude:"Headloss/Distance",unit:"m/km",},

	//L2 Wastewater Collection
	"wwc_vol_conv":{magnitude:"Volume",unit:"m3",},
	"wwc_nrg_cons":{magnitude:"Energy",unit:"kWh",},
	"wwc_vol_pump":{magnitude:"Volume",unit:"m3",},
	"wwc_pmp_head":{magnitude:"Head",unit:"m",},
	c_wwc_vol_head:{magnitude:"Volume x Head",unit:"m<sup>3</sup> x 100m",},
	wwc_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wwc_KPI_std_nrg_cons:{magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m",},

	//L2 Wastewater Treatment
	"wwt_biog_pro":{magnitude:"Volume",unit:"Nm3",},
	"wwt_biog_val":{magnitude:"Volume",unit:"m3",},
	"wwt_vol_trea":{magnitude:"Volume",unit:"m3",},
	"wwt_nrg_cons":{magnitude:"Energy",unit:"kWh",},
	"wwt_bod_infl":{magnitude:"Mass",unit:"kg",},
	"wwt_bod_effl":{magnitude:"Mass",unit:"kg",},
	"wwt_nrg_biog":{magnitude:"Energy",unit:"kWh",},
	"wwt_ch4_biog":{magnitude:"Percentage",unit:"%",},
	"wwt_tst_cmpl":{magnitude:"Number",unit:"number",},
	"wwt_tst_cond":{magnitude:"Number",unit:"number",},
	"wwt_mass_slu":{magnitude:"Mass",unit:"kg",},
	"wwt_dryw_slu":{magnitude:"Mass",unit:"kg",},
	"wwt_trea_cap":{magnitude:"Volume",unit:"m3",},
	c_wwt_nrg_biog :{magnitude:"Energy",unit:"kWh",},
	c_wwt_bod_rmvd :{magnitude:"Mass",unit:"kg",},
	wwt_KPI_nrg_per_m3:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wwt_KPI_nrg_per_kg:{magnitude:"Energy/Mass",unit:"kWh/Kg BOD removed",},
	wwt_KPI_biog_x_bod:{magnitude:"Volume/Mass",unit:"Nm<sup>3</sup>/kg BOD removed",},
	wwt_KPI_nrg_biogas:{magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wwt_KPI_nrg_x_biog:{magnitude:"Percent",unit:"%",},
	wwt_KPI_sludg_prod:{magnitude:"Mass/Volume",unit:"kg/m<sup>3</sup>",},
	wwt_KPI_dry_sludge:{magnitude:"Percent",unit:"% DW",},
	wwt_KPI_capac_util:{magnitude:"Percent",unit:"%",},
	wwt_SL_qual_com :{magnitude:"Percentage",unit:"%",},

	//L2 Wastewater Discharge
	"wwd_vol_disc" :      {magnitude:"Volume",unit:"m3",},
	"wwd_nrg_cons" :      {magnitude:"Energy",unit:"kWh",},
	"wwd_nrg_recv" :      {magnitude:"Energy",unit:"kWh",},
	"wwd_vol_pump":       {magnitude:"Volume",unit:"m3",},
	"wwd_pmp_head":       {magnitude:"Head",unit:"m",},
	"wwd_vol_turb":       {magnitude:"Volume",unit:"m3",},
	"wwd_trb_head":       {magnitude:"Head",unit:"m3",},
	c_wwd_vol_head:       {magnitude:"Volume x head",unit:"m<sup>3</sup> x 100m",},
	c_wwd_trb_head:       {magnitude:"Volume x head",unit:"m<sup>3</sup> x 100m",},
	wwd_KPI_nrg_per_m3:   {magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",},
	wwd_KPI_nrg_rcv_di:   {magnitude:"Energy/Volume",unit:"kWh/m<sup>3</sup>",}, 
	wwd_KPI_std_nrg_cons: {magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m",},
	wwd_KPI_std_nrg_recv: {magnitude:"Energy/Volume/Head",unit:"kWh/m<sup>3</sup>/100m",},
}
