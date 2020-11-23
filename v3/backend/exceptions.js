/*
  - 'exceptions' are inputs with a list of possible values that set the number
    what is different of normal dropdowns is that the user can also enter a
    number besides selecting an option.
*/
let Exceptions={
  wwc_ch4_efac_col:{ table:"type_of_sewer",                table_field:function(){return "ch4_efac"}, },
  wwc_ch4_efac_cso:{ table:"type_of_water_body",           table_field:function(){return "ch4_efac"}, },
  wwc_n2o_efac_cso:{ table:"N2O EF effluent (Table 6.8A)", table_field:function(){return "n2o_efac"}, },

  //wwt effluent BOD estimation
  wwt_bod_effl:{
    table:"WW treatment organics removal fractions (centralised) (Table 6.6B and 6.10C)",
    table_field:function(){return "bod_effl"},
    percent_of:function(stage){
      return stage.wwt_bod_infl;
    },
  },

  //wwo effluent BOD estimation
  wwo_bod_effl:{
    table:"WW treatment organics removal fractions (onsite) (Table 6.6B and 6.10C)",
    table_field:function(){return "bod_effl"},
    percent_of:function(stage){
      return stage.wwo_bod_infl;
    },
  },

  //wwt effluent TN estimation
  wwt_tn_effl:{
    table:"WW treatment organics removal fractions (centralised) (Table 6.6B and 6.10C)",
    table_field:function(){return "N_effl"},
    percent_of:function(stage){
      return stage.wwt_tn_infl;
    },
  },

  //wwo effluent TN estimation
  wwo_tn_effl:{
    table:"WW treatment organics removal fractions (onsite) (Table 6.6B and 6.10C)",
    table_field:function(){return "N_effl"},
    percent_of:function(stage){
      return stage.wwo_tn_infl;
    },
  },

  //Emission Factors (EF)
  wwt_ch4_efac_tre:{ table:"type_of_treatment",            table_field:function(){return "ch4_efac"}, },
  wwt_ch4_efac_dis:{ table:"type_of_water_body",           table_field:function(){return "ch4_efac"}, },
  wwt_n2o_efac_tre:{ table:"N2O EF plants (Table 6.8A)",   table_field:function(){return "n2o_efac"}, },
  wwt_n2o_efac_dis:{ table:"N2O EF effluent (Table 6.8A)", table_field:function(){return "n2o_efac"}, },
  wwo_n2o_efac_tre:{ table:"N2O EF plants (Table 6.8A)",   table_field:function(){return "n2o_efac"}, },
  wwo_n2o_efac_dis:{ table:"N2O EF effluent (Table 6.8A)", table_field:function(){return "n2o_efac"}, },
  wwo_ch4_efac_unt:{ table:"type_of_water_body",           table_field:function(){return "ch4_efac"}, },
  wwo_ch4_efac_dis:{ table:"type_of_water_body",           table_field:function(){return "ch4_efac"}, },
  wwo_ch4_efac_con:{
    table:"Type of containment",
    table_field:function(stage){
      if(stage.wwo_flooding){
        return "ch4_efac_flooding";
      }else{
        return "ch4_efac";
      }
    },
  },

  wwt_bod_slud:{
    table:"REMOVAL OF ORGANIC COMPONENT FROM WASTEWATER AS SLUDGE (KREM) ACCORDING TO TREATMENT TYPE (Table 6.6A)",
    table_field:function(){return "K_rem"},
    table_field_unit:function(){return "kgBOD/kg dry mass sludge"},
    conversion:function(stage){
      let sludge = stage.wwt_mass_slu;
      return sludge;
    },
  },

  wwt_mass_slu:{
    table:"Sludge characteristics in each stage of the treatment process",
    table_field:function(){return "gSS_inh_day"},
    table_field_unit:function(){return "gSS/inhabitant/day"},
    conversion:function(stage){
      //convert gSS/inh/day to kgSS
      let pop  = stage.wwt_serv_pop; //population
      let days = Global.Days();      //days
      return pop*days/1000;
    },
  },

  wwo_fdensity:{    table:"Type of containment", table_field:function(){return "fs_density"}, },
  wwo_bod_conc_fs:{ table:"Type of containment", table_field:function(){return "BOD_conc_FS"}, },
};
