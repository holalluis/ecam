// vim: set foldlevel=0 nomodeline:
//-----------------------------------------------------------------------------
// COMMON ELEMENTS (visible everywhere)
//-----------------------------------------------------------------------------
  let loading_container = new Vue({
    el:"#loading_container",
    data:{
      Languages,
    },
    methods:{
      ready(){
        return this.Languages.ready;
      },
    },
  });

  let caption = new Vue({
    el:"#caption",
    data:{
      visible:false,
      text:"caption text",
    },
    methods:{
      show(ev, new_text){
        ev.stopPropagation(); //prevent parent elements triggering show()
        this.text = new_text;
        this.visible=true;
        let el=document.querySelector("#caption");
        el.style.left=(ev.clientX-10)+"px";
        el.style.top=(ev.clientY+15)+"px";
      },

      hide(){
        this.visible=false;
      },
    },
  });

  let ecam_logo = new Vue({
    el:'#ecam-logo',
    data:{
      version:"v3.0",
      Languages,
    },
    methods:{
      translate,
    },
  });

  let sidebar = new Vue({
    el:"#sidebar",
    data:{
      visible:false,
      Global,
      Structure,
    },
    methods:{
      translate,
      go_to(level, sublevel){
        let possible_levels = this.Structure.filter(s=>!s.sublevel).map(s=>s.level);
        
        possible_levels.push('General');
        possible_levels.push('UNFCCC');

        if(possible_levels.indexOf(level)==-1){
          throw new Error(`cannot go to level '${level}'`);
        }

        tier_b.level    = level;
        tier_b.sublevel = sublevel||false;
        tier_b.current_stage = sublevel ? Global[level][sublevel] : Global[level];

        ecam.show('tier_b');
      },
      get_height(){
        return document.querySelector("#ecam-logo").offsetHeight;
      },
    },
  });

  let linear_menu = new Vue({
    el:'#linear-menu',
    data:{
      visible:false,
      Global,
      Structure,
      caption,
      current_view:null,
    },
    methods:{
      translate,
      go_to: sidebar.go_to,
      is_tier_b_selected(level, sublevel){
        if(this.current_view!='tier_b') return false;
        if(level==tier_b.level && sublevel==tier_b.sublevel){
          return true;
        }
      },
    },
  });

  let variable = new Vue({
    el:"#variable",
    data:{
      visible:false,
      id:"wsa_nrg_cons",  //default variable code
      question:false,     //question where id is inside

      //stage where id belongs to
      localization:{
        level:'Water',
        sublevel:'Abstraction',
      },

      //backend
      Global,
      Info,
      Structure,
      Units,
      Tables,
      Recommendations,
      Exceptions,
      Formulas,
      Questions,
      Cts,
    },
    methods:{
      translate,
      format,
      go_to: sidebar.go_to,

      /* get current stage */
      //TODO refactor
      get_current_stage(){
        let level    = this.localization.level;
        let sublevel = this.localization.sublevel;
        if(sublevel){
          return this.Global[level][sublevel];
        }else if(level){
          return this.Global[level];
        }else{
          return false;
        }
      },

      //get variable type
      //TODO refactor
      get_variable_type(){
        let type = typeof(this.get_current_stage()[this.id]);
        switch(type){
          case 'number':   return 'input'; break;
          case 'function': return 'output';break;
          default: throw new Error("variable type error");
        }
      },

      //TODO refactor
      get_level_color(level){
        level = level || this.localization.level;
        let stage = this.Structure.find(s=>s.level==level);
        if(stage){
          return stage.color;
        }else{
          return "#2b6488";
        }
      },

      /* open variable VIEW */
      view(id){
        if(Info[id]){
          this.id           = id;
          this.question     = this.Questions.is_inside(this.id);
          this.localization = this.locate_variable(id);
        }else{
          throw new Error(`Variable "${id}" does not exist`);
          return;
        }
        if(typeof(ecam)=='object'){
          ecam.show('variable');
          caption.hide();
        }
      },

      /* find a variable inside 'Global' */
      locate_variable(code) {
        let level    = false; //level 1
        let sublevel = false; //level 2

        //array of possible level1 names
        let possible_levels = this.Structure.filter(s=>!s.sublevel).map(s=>s.level);
        possible_levels.push('General');

        //search inside Global
        for(let l1 in Global){
          if(possible_levels.indexOf(l1) == -1){ continue; }
          for(let field in Global[l1]){
            if(typeof(Global[l1][field])=='object'){
              for(let subfield in Global[l1][field]){
                if(code==subfield){
                  level    = l1;
                  sublevel = field;
                  return {level, sublevel};
                  break;
                }
              }
            }else{
              if(code==field){
                level = l1;
                return {level, sublevel}
                break;
              }
            }
          }
        }

        //return value
        if(!level && !sublevel){
          return false;
        }else{
          return {level, sublevel};
        }
      },

      //find value of variable "code"
      get_variable_value(code){
        let loc = this.locate_variable(code);
        if(!loc){
          console.log(loc);
          throw new Error(`variable "${code}" not found`);
        }

        let current_stage = null;

        if(loc.sublevel){
          current_stage = this.Global[loc.level][loc.sublevel];
        }else{
          current_stage = this.Global[loc.level];
        }

        switch(typeof(current_stage[code])){
          case 'number':   return current_stage[code];   break;
          case 'function': return current_stage[code](); break;
          default:
            throw new Error('type error');
            break;
        }
      },

      get_current_unit(key){
        if(!Info[key]){
          return `["${key}" unit not found]`;
        }
        if(Info[key].magnitude=='Currency'){
          return this.Global.General.Currency;
        }
        if(undefined===this.Global.Configuration.Units[key]){
          this.Global.Configuration.Units[key] = this.Info[key].unit;
        }
        return this.Global.Configuration.Units[key];
      },
    },
  });

//-----------------------------------------------------------------------------
// VIEWS (= pages)
//-----------------------------------------------------------------------------
  let index = new Vue({
    el:'#index',
    data:{
      visible:true,
      Global,
    },
    methods:{
      translate,
    },
  });

  let about = new Vue({
    el:"#about",
    data:{
      visible:false,
    },
    methods:{
      translate
    },
  });

  let help = new Vue({
    el:"#help",
    data:{
      visible:false,
    },
    methods:{
      translate
    },
  });

  let get_started = new Vue({
    el:"#get_started",
    data:{
      visible:false,
      Global,
    },
    methods:{
      translate,
    },
  });

  let configuration = new Vue({
    el:'#configuration',
    data:{
      visible:false,
      Global,
      Structure,
      Countries,
      GWP_reports,
      Cts,
    },
    methods:{
      translate,

      //deactivate level2 when level1 is deactivated
      check_l2_from_l1(){
        //if level1 is inactive, set related level2 inactive
        Structure.filter(l=>l.sublevel==false).forEach(l1=>{
          if(!Global.Configuration.ActiveStages[l1.alias]){
            //reset l1 values
            this.reset_stage(l1.alias);
            //reset l2 values
            Structure.filter(l=>(l.sublevel && l.level==l1.level))
              .forEach(l=>{
                Global.Configuration.ActiveStages[l.alias]=false;
                this.reset_stage(l.alias);
              });
          }
        });
      },

      //activate level1 when level2 is activated
      check_l1_from_l2(){
        //if level2 is active, set related level1 active
        Structure.filter(l=>l.sublevel).forEach(l2=>{
          if(Global.Configuration.ActiveStages[l2.alias]){
            Structure.filter(l=>(l.sublevel==false && l.level==l2.level))
              .forEach(l=>{
                Global.Configuration.ActiveStages[l.alias]=true;
              });
          }else{
            this.reset_stage(l2.alias);
          }
        });
      },

      //activate all stages
      activate_all_stages(){
        Structure.forEach(l=>{
          Global.Configuration.ActiveStages[l.alias]=true;
        })
      },

      //reset a stage:
      //1) set all variables to zero
      //2) reset substages (only level2)
      reset_stage(alias){
        let stage=Structure.find(s=>s.alias==alias);
        if(!stage) throw `stage '${alias}' not found`

        let obj = null; //stage object inside Global

        if(stage.sublevel==false){
          //l1
          obj = Global[stage.level];
        }else{
          //l2
          obj = Global[stage.level][stage.sublevel];
          Substages[stage.level][stage.sublevel]=[]; //reset substages
        }

        //reset obj values
        for(let key in obj) {
          if(typeof(obj[key])=="number") obj[key]=0;
        }
      },

      //set variables from selected country
      set_variables_from_selected_country(){
        let country = Global.General.Country;
        Global.Configuration.Selected.prot_con=country;
        //variables in Global.General to be changed:
        [ 'conv_kwh_co2',
          'prot_con',
          'bod_pday',
          'bod_pday_fs'
        ].forEach(key=>{
          //put bod_pday value in faecal sludge as well
          let key2 = key;
          if(key=="bod_pday_fs"){ key2="bod_pday"; }
          Global.General[key]=Countries[country][key2];
        });
      },

      //answer fuel engines question
      answerAnyFuelEngines(){
        let ans=parseInt(Global.General.anyFuelEngines);
        Global.General.anyFuelEngines=ans;
        Global.Configuration.Questions.wsa_engines=ans;
        Global.Configuration.Questions.wst_engines=ans;
        Global.Configuration.Questions.wsd_engines=ans;
        Global.Configuration.Questions.wwc_engines=ans;
        Global.Configuration.Questions.wwt_engines=ans;
        Global.Configuration.Questions.wwd_engines=ans;
        Global.Configuration.Questions.fst_engines=ans;
        if(!ans){
          //reset stage values
          Global.Water.Abstraction .wsa_vol_fuel=0;
          Global.Water.Treatment   .wst_vol_fuel=0;
          Global.Water.Distribution.wsd_vol_fuel=0;
          Global.Waste.Collection  .wwc_vol_fuel=0;
          Global.Waste.Treatment   .wwt_vol_fuel=0;
          Global.Waste.Discharge   .wwd_vol_fuel=0;
          Global.Faecl.Treatment   .fst_vol_fuel=0;
          //reset substage values
          Substages.Water.Abstraction .forEach(s=>{s.wsa_vol_fuel=0});
          Substages.Water.Treatment   .forEach(s=>{s.wst_vol_fuel=0});
          Substages.Water.Distribution.forEach(s=>{s.wsd_vol_fuel=0});
          Substages.Waste.Collection  .forEach(s=>{s.wwc_vol_fuel=0});
          Substages.Waste.Treatment   .forEach(s=>{s.wwt_vol_fuel=0});
          Substages.Waste.Discharge   .forEach(s=>{s.wwd_vol_fuel=0});
          Substages.Faecl.Treatment   .forEach(s=>{s.fst_vol_fuel=0});
        }
      },

      //set constants from selected gwp report
      set_constants_from_gwp_report(){
        let index = Global.Configuration.Selected.gwp_reports_index;
        Cts.ct_ch4_eq.value = GWP_reports[index].ct_ch4_eq;
        Cts.ct_n2o_eq.value = GWP_reports[index].ct_n2o_eq;
      },
    },
  });

  let countries = new Vue({
    el:"#countries",
    data:{
      visible:false,
      Global,
      Countries,
    },
    methods:{
      translate,
    },
  });

  let gwp_table = new Vue({
    el:"#gwp_table",
    data:{
      visible:false,
      Global,
      GWP_reports,
    },
    methods:{
      translate,
    }
  });

  let population = new Vue({
    el:'#population',
    data:{
      visible:false,
      Global,
      Structure,
      Population:[
        {level:'Water', stage:Global.Water,            code:'ws_resi_pop'},
        {level:'Water', stage:Global.Water,            code:'ws_serv_pop'},
        {level:'Waste', stage:Global.Waste,            code:'ww_resi_pop'},
        {level:'Waste', stage:Global.Waste.Collection, code:'wwc_conn_pop'},
        {level:'Waste', stage:Global.Waste.Treatment,  code:'wwt_serv_pop'},
        {level:'Faecl', stage:Global.Faecl,            code:'fs_resi_pop'},
        {level:'Faecl', stage:Global.Faecl,            code:'fs_onsi_pop'},
      ],
      caption,
    },
    methods:{
      translate,
      format,
      focus_input(pop, event){
        let input = event.target;
        input.value = pop.stage[pop.code]
        input.select();
      },
      blur_input(pop, event){
        let input = event.target;
        let value = parseFloat(input.value) || 0;
        pop.stage[pop.code] = value;
        input.value=format(pop.stage[pop.code]);
      },
    }
  });

  let tier_a = new Vue({
    el:"#tier_a",
    data:{
      visible:false,
      Global,
      Info,
      Structure,
      Questions,
      Tables,
    },
    methods:{
      translate,
      format,
      //get current unit for specific variable
      get_current_unit: variable.get_current_unit,

    },
  });

  let tier_b = new Vue({
    el:"#tier_b",
    data:{
      visible:false,
      level:'Water',
      sublevel:'Abstraction',
      current_stage:Global.Water.Abstraction,

      Global,
      Info,
      Structure,
      Tips,
      Units,
      Tables,
      Recommendations,
      Exceptions,
      Normalization,
      Formulas,
      Questions,
      caption,
      variable,
    },
    methods:{
      translate,
      format,
      get_level_color: variable.get_level_color,
      set_question(question, new_value){
        //set new question answer
        this.Global.Configuration.Questions[question] = new_value;

        //if answer is no:
        if(!new_value){
          //disable related questions recursively
          Questions[question].otherQuestions.forEach(key=>{
            this.set_question(key, false);
          });

          //reset values
          Questions.reset_values(question, this.current_stage);

          //reset folding
          Questions[question].folded = 0;
          Questions[question].otherQuestions.forEach(key=>{
            Questions[key].folded = 0;
          });
        }
      },
    },
  });

  let summary_ghg = new Vue({
    el:"#summary_ghg",
    data:{
      visible:false,

      //select summary unit TODO
      current_unit:"kgCO2eq",
      units: [
        "kgCO2eq",
        "kgCO2eq/assessment_period",
        "kgCO2eq/year/serviced_population",
      ],

      //avoided ghg - list of variables
      ghg_avoided:[
        {level:'Waste', sublevel:'Treatment', code:'wwt_SL_GHG_avoided'},
        {level:'Waste', sublevel:'Treatment', code:'wwt_wr_C_seq_slu'},
        {level:'Waste', sublevel:'Discharge', code:'wwd_wr_GHG_avo_d'},
        {level:'Waste', sublevel:'Discharge', code:'wwd_SL_ghg_non'},
        {level:'Waste', sublevel:'Discharge', code:'wwd_wr_GHG_avo'},
        {level:'Faecl', sublevel:'Treatment', code:'fst_SL_GHG_avoided'},
        {level:'Faecl', sublevel:'Reuse',     code:'fsr_ghg_avoided_land'},
        {level:'Faecl', sublevel:'Reuse',     code:'fsr_ghg_avoided_reuse'},
      ],

      //backend
      Global,
      Structure,
      variable,
    },
    methods:{
      translate,
      format,
      go_to: sidebar.go_to,
    },
  });

  let summary_nrg = new Vue({
    el:"#summary_nrg",
    data:{
      visible:false,
      Global,
      Structure,
    },
    methods:{
      translate,
      format,
      go_to: sidebar.go_to,
    },
  });

  let opportunities = new Vue({
    el:"#opportunities",
    data:{
      visible:false,
    },
  });

  let constant = new Vue({
    el:"#constant",
    data:{
      visible: false,
      code:"ct_ch4_lf",

      Cts,
      Formulas,

      variable,
    },
    methods:{
      translate,
      format,

      /* open constant VIEW */
      view(code){
        if(this.Cts[code]){
          this.code = code;
        }else{
          throw new Error(`Constant "${code}" does not exist`);
          return;
        }
        if(typeof(ecam)=='object'){
          ecam.show('constant');
          caption.hide();
        }
      },
    }
  });

  let constants = new Vue({
    el:"#constants",
    data:{
      visible: false,
      Cts,

      constant,
    },
    methods:{
      translate,
      format,
    }
  });

//-----------------------------------------------------------------------------
// MAIN CONTROLLER (not a vue component)
//-----------------------------------------------------------------------------
let ecam={
  //componenets == all can be active
  components:{
    ecam_logo,     //top logo
    sidebar,       //side bar (left)
    linear_menu,   //linear menu top
    caption,       //mouse over notes
  },

  //views == pages: only one is active
  views:{
    index,         //landing page
    get_started,   //general info
    configuration, //configuration of stages
    countries,     //list of countries for preselecting emission factors
    population,    //inserting number of inhabitants to each section
    gwp_table,
    about,
    help,
    tier_a,
    tier_b,
    summary_ghg,
    summary_nrg,
    opportunities,
    variable,
    constants,
    constant,
  },

  /*METHODS*/
  //hide all views
  hide_all(){
    Object.entries(this.views).forEach(([key,view])=>{
      //console.log(key);
      if(view.constructor===Vue){
        if(view.visible){
          view.visible=false;
        }
      }
    });
  },

  //show a view
  show(view){
    if(!this.views[view]){
      throw new Error(`view '${view}' not found`);
    }

    //activate linear_menu when entering tier_b
    if(['tier_a','tier_b'].indexOf(view)+1){
      linear_menu.visible=true;
    }

    this.hide_all();
    this.views[view].visible=true;
    linear_menu.current_view = view;
    window.scrollTo(0,0);
  },

  //force render views and components (for language tags)
  force_update(){
    Object.entries(this.views)
      .concat(Object.entries(this.components))
      .forEach(([key,obj])=>{
        obj.$forceUpdate();
    });
  },
};
