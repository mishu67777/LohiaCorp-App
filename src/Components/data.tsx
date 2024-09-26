export const data = {
    "production planning": [
        {
            "name": "Tape Line Operations ",
            "image": "../assets/extrusion.png",
            "entries": 
            // [
                {
                    "name": "Production & Process calculator",
                    "entries": 
                    [
                        {
                            "name": "Tape Line output",
                            "formulalist": [{
                                "name": "Tape Line output",
                                "fontsize": "12",
                                "formula": " {{ No. \\space of \\space Tapes * Tape \\space Denier * Line \\space Speed * 60} \\over {9000 * 1000}}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'No. of Tapes', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Tape Denier (gms/9000m)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Line Speed (m/min)', "modelPropName": 'para3', "type": "number" }
                            ],
                            "unit":"kg/hr",
                            "formulaFn": "formulaOne"
                        },
                        {
                            "name": "Stretch Ratio (SR)",
                            "formulalist": [{
             
                                "name": "Stretch Ratio(SR)",
                                "fontsize": "12",
                                "formula": "{{Stretching \\space godet \\space speed} \\over {Holding \\space Godet \\space speed}}"

                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Stretching godet speed (m/min)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Holding godet speed (m/min)', "modelPropName": 'para2', "type": "number" },

                            ],
                            "unit":"",
                            "formulaFn": "formulaThirtythree"
                        },
                        {
                            "name": "Unstretched tape width",
                            "formulalist": [{
                                "name": "Unstretched tape width",
                                "fontsize": "9",
                                "formula": "{\\sqrt{Stretch \\space ratio} * Desired \\space tape \\space width(mm) + Blade \\space thickness}"
                            }, {
                                "name": "Stretch Ratio (SR)",
                                "fontsize": "12",
                                "formula": "{{Stretching \\space godet \\space speed} \\over {Holding \\space Godet \\space speed}}"

                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Stretching godet speed (m/min)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Holding godet speed (m/min)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Desired tape width (mm)', "modelPropName": 'para3', "type": "number" },
                                { "placeholder": '', "name": 'Blade thickness (0.1mm or 0.2mm)', "modelPropName": 'para4', "type": "number" }
                            ],
                            "unit":"mm",
                            "formulaFn": "formulaTwo"
                        },
                        {
                            "name": "Elongation%",

                            "formulalist": [{
                                "name": "Elongation%",
                                "fontsize": "12",
                                "formula": "{{{Tape \\space Final \\space Length(mm) - Initial \\space Length(mm) }\\over{Initial \\space  Length(mm)}} *100}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Tape Final Length (mm)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Initial Length (mm)', "modelPropName": 'para2', "type": "number" },
                            ],
                            "unit":"%",
                            "formulaFn": "formulaThree"
                        },
                        {
                            "name": "Stretched Tape Thickness in microns",
                            "formulalist": [{
                                "name": "Stretched Tape Thickness in microns",
                                "fontsize": "12",
                                "formula": "{{{Denier}\\over{Tape  \\space width * Density * 9000}} * 1000}"
                            }, 
                            
                        ],
                            "MY_DATA": [
                               
                                { "placeholder": '', "name": 'Denier', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Tape width (mm)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Density (gms/cc)', "modelPropName": 'para3', "type": "number" }


                            ],
                            "unit":"μ",
                            "formulaFn": "formulaFour"
                        },
                        {
                            "name": "Unstretched Tape Thickness",
                            "formulalist": [{
                                "name": "Unstreched Tape Thickness",
                                "fontsize": "9",
                                "formula": "{\\sqrt{Stretch \\space ratio} * Stretched  \\space Tape \\space Thickness(mm) }"
                            }, {
                                "name": "Stretch Ration (SR)",
                                "fontsize": "12",
                                "formula": "{{Stretching \\space godet \\space speed} \\over {Holding \\space Godet \\space speed}}"

                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Stretching godet speed (m/min)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Holding godet speed (m/min)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Stretched tape thickness (mm)', "modelPropName": 'para3', "type": "number" }
                            ],
                            "unit":"mm",
                            "formulaFn": "formulaFive"
                        },
                        {
                            "name": "Denier Setting formula using holding speed",
                            "formulalist": [{
                                "name": "Denier Setting using holding speed",
                                "fontsize": "12",
                                "formula": "{{Holding \\space Speed * Actual \\space Denier} \\over {Required \\space Denier}}"

                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Holding speed (m/min)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Actual denier', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Required denier', "modelPropName": 'para3', "type": "number" }
                            ],
                            "unit":"m/min",
                            "formulaFn": "formulaSix"
                        },
                        {
                            "name": "Annealing",
                            "formulalist": [{
                                "name": "Annealing",
                                "fontsize": "12",
                                "formula": "{{{Stretching \\space Speed  - Annealing \\space Speed }\\over{Stretching \\space  Speed}} *100}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Stretching speed (m/min)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Annealing speed (m/min)', "modelPropName": 'para2', "type": "number" },
                            ],
                            "unit":"%",
                            "formulaFn": "formulaSeven"
                        },
                        {
                            "name": "Tenacity (GPD)",
                            "formulalist": [{
                                "name": "Tenacity (GPD)",
                                "fontsize": "12",
                                "formula": "{{Strength \\over Denier } *1000}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Strength (kgf)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Denier', "modelPropName": 'para2', "type": "number" },
                            ],
                            "unit":"gpd",
                            "formulaFn": "formulaEight"
                        },
                        {
                            "name": "Denier setting formula using Screw RPM ",
                            "formulalist": [{
                                "name": "Denier setting formula through Screw RPM ",
                                "fontsize": "12",
                                "formula": "{{Screw \\space  speed * Required \\space  denier} \\over Actual \\space  denier }"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Screw speed (rpm)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Required denier', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Actual denier', "modelPropName": 'para3', "type": "number" }
                            ],
                            "unit":"rpm",
                            "formulaFn": "formulaNine"
                        },
                        {
                            "name": "Useful Width (Flat Film)",
                            "formulalist": [{
                                "name": "Useful Width (Flat Film) ",
                                "fontsize": "9",
                                "formula": "{Film \\space width - (Edge \\space Trim \\space on \\space Extruder(mm))}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Film width (mm)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Edge trim (mm)', "modelPropName": 'para2', "type": "number" }
                            ],
                            "unit":"mm",
                            "formulaFn": "formulaTen"
                        },
                        {
                            "name": "Number of Tapes",
                            "formulalist": [{
                                "name": "Number of Tapes ",
                                "fontsize": "12",
                                "formula": "{{Film \\space width - (Edge \\space trims \\space  * 2 )}\\over Unstretched \\space tape \\space width}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Film width (mm)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Edge trims (on either side)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Unstretched tape width (mm)', "modelPropName": 'para3', "type": "number" }
                            ],
                            "formulaFn": "formulaEleven"
                        },
                        {
                            "name": "Spacer Size",
                            "formulalist": [{
                                "name": "Spacer Size",
                                "fontsize": "9",
                                "formula": "{\\sqrt{Stretch \\space ratio} * Stretched  \\space width \\space of \\space Tape(mm) - Blade \\space Thickness }"
                            }, {
                                "name": "Stretch Ratio(SR)",
                                "fontsize": "12",
                                "formula": "{{Stretching \\space godet \\space speed} \\over {Holding \\space Godet \\space speed}}"

                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Stretching godet speed (m/min)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Holding godet speed (m/min', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Stretched width of tape (mm)', "modelPropName": 'para3', "type": "number" },
                                { "placeholder": '', "name": 'Blade thickness (mm)', "modelPropName": 'para4', "type": "number" }

                            ],
                            "unit":"mm",
                            "formulaFn": "formulaTwelve"
                        },
                        {
                            "name": "Gear Ratio Formula",
                            "formulalist": [{
                                "name": "Gear Ratio Formula",
                                "fontsize": "12",
                                "formula": "{{Motor \\space speeds (RPM)* Motor \\space Pulley \\space Dia(mm)} \\over {Screw  \\space rpm (RPM) * Gear \\space Box \\space Pulley \\space Dia(mm)}}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Motor speed (RPM)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Motor pulley dia (mm)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Screw rpm (RPM)', "modelPropName": 'para3', "type": "number" },
                                { "placeholder": '', "name": 'Gear box pulley dia (mm)', "modelPropName": 'para4', "type": "number" },

                            ],
                            "formulaFn": "formulaThirteen"
                        },
                        {
                            "name": "Die Setting Formula",
                            "formulalist": [{
                                "name": "Die Setting Formula",
                                "fontsize": "12",
                                "formula": "{{Film \\space Width  \\over  Spacer \\space Size} \\over No. \\space of \\space die \\space setting \\space bolts}"
                            }],

                            "MY_DATA": [
                                { "placeholder": '', "name": 'Film width (mm)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Spacer size (mm)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'No. of die setting bolts', "modelPropName": 'para3', "type": "number" },
                            ],
                            "unit":"mm",
                            "formulaFn": "formulaFourteen"
                        }
                    ]
                },
                
            // ],
        },
        {
            "name": "Loom Operations",
            "image": "../assets/weaving.png",
            "entries": 
            // [
                {
                    "name": "Production & Process calculator",
                    "entries": [
                        {
                            "name": "Picks Per Minute(PPM)",
                            "formulalist": [{
                                "name": "Picks/Minute(PPM)",
                                "fontsize": "9",
                                "formula": "{Cam \\space RPM  * No. \\space of \\space Shuttles }"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Cam RPM', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'No. of Shuttles', "modelPropName": 'para2', "type": "number" }

                            ],
                            "unit":"ppm",
                            "formulaFn": "formulafifteen"
                        },
                        {
                            "name": "Loom Production using PPM",
                            "formulalist": [{
                                "name": "Loom Production using PPM",
                                "fontsize": "12",
                                "formula": "{{1.524 * PPM} \\over {Weft \\space mesh (per \\space inch)} }"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'PPM', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Weft mesh (per inch)', "modelPropName": 'para2', "type": "number" },
                            ],
                            "unit":"m/hr",
                            "formulaFn": "formulasixteen"
                        },
                        {
                            "name": "Loom Production using GSM",
                            "formulalist": [{
                                "name": "Loom Production using GSM",
                                "fontsize": "12",
                                "formula": "{{Production(m/hr) * 2*DFL(cm) *GSM} \\over 1,00,000}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Production (m/hr)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'DFL (cm)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'GSM', "modelPropName": 'para3', "type": "number" }
                            ],
                            "unit":"kg/hr",
                            "formulaFn": "formulaseventeen"
                        },
                        {
                            "name": "Loom Production using GPM",
                            "formulalist": [{
                                "name": "Loom Production using GPM",
                                "fontsize": "12",
                                "formula": "{{Production(mtr/hr)  *GPM} \\over 1000}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Production (mtr/hr)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'GPM', "modelPropName": 'para2', "type": "number" },
                            ],
                            "unit":"kg/hr",
                            "formulaFn": "formulaeighteen"
                        },
                        {
                            "name": "No. of Looms for line balancing with Tape Line",
                            "formulalist": [{
                                "name": "No. of Looms for line balancing with Tape Line",
                                "fontsize": "12",
                                "formula": "{{Tape \\space Output(Kg/hr)  * Efficiency \\space of \\space T/L } \\over {Loom \\space Output(Kg/hr) * Efficiency \\space of \\space Loom} }"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Tape output (Kg/hr)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Efficiency of T/L (%)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Loom output (Kg/hr)', "modelPropName": 'para3', "type": "number" },
                                { "placeholder": '', "name": 'Efficiency of loom (%)', "modelPropName": 'para4', "type": "number" },
                            ],
                            "formulaFn": "formulanineteen"
                        },
                        {
                            "name": "Fabric GSM using Mesh per inch",
                            "formulalist": [{
                                "name": "Fabric GSM using Mesh per inch",
                                "fontsize": "12",
                                "formula": "{{(Warp \\space denier * Warp \\space mesh) +(Weft \\space denier * Weft \\space mesh)} \\over 228.6}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Warp denier', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Warp mesh per inch', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Weft denier', "modelPropName": 'para3', "type": "number" },
                                { "placeholder": '', "name": 'Weft mesh per inch', "modelPropName": 'para4', "type": "number" },
                            ],
                            "formulaFn": "formulatwenty"
                        },
                        {
                            "name": "DFL",
                            "formulalist": [{
                                "name": "DFL",
                                "fontsize": "9",
                                "formula": "{{1\\over2}* Circumference \\space of \\space Tubular \\space Fabric \\space in \\space cm}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Circumference of Tubular Fabric (cm)', "modelPropName": 'para1', "type": "number" }
                            ],
                            "unit":"cm",
                            "formulaFn": "formulatwentyone"
                        },
                        {
                            "name": "Weaving ring size for Laminated Fabric",
                            "formulalist": [{
                                "name": "Weaving ring size for Laminated Fabric",
                                "fontsize": "9",
                                "formula": "{(2*DFL)/3.14 + 8}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'DFL (mm)', "modelPropName": 'para1', "type": "number" }
                            ],
                            "unit":"mm",
                            "formulaFn": "formulatwentytwo"
                        },
                        {
                            "name": "Weaving ring size for Unlaminated Fabric",
                            "formulalist": [{
                                "name": "Weaving ring size for Unlaminated Fabric",
                                "fontsize": "9",
                                "formula": "{(2*DFL)/3.14 }"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'DFL (mm)', "modelPropName": 'para1', "type": "number" }
                            ],
                            "unit":"mm",
                            "formulaFn": "formulatwentythree"
                        },
                        {
                            "name": "Denier Calculation",
                            "formulalist": [{
                                "name": "Denier Calculation",
                                "fontsize": "12",
                                "formula": "{{228.6 * GSM}\\over Warp+Weft}"
                            }
                        ],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'GSM', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Warp (per inch)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Weft (per inch)', "modelPropName": 'para3', "type": "number" },
                            ],
                            "formulaFn": "formulatwentyfour"
                        },
                        {
                            "name": "GSM",
                            "formulalist": [{
                                "name": "GSM (Grams per Sq meter)",
                                "fontsize": "12",
                                "formula": "{{ Denier*(Warp+Weft)}\\over 228.6}"
                            }
                        ],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Denier', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Warp (per inch)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Weft (per inch)', "modelPropName": 'para3', "type": "number" },
                            ],
                            "formulaFn": "formulatwentyfive"
                        },
                        {
                            "name": "GPM",
                            "formulalist": [{
                                "name": "GPM (Grams Per Meter)",
                                "fontsize": "12",
                                "formula": "{{ GSM * Width \\space of \\space fabric(inch)}\\over 19.68}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'GSM', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Width of fabric (inch)', "modelPropName": 'para2', "type": "number" },
                        
                            ],
                            "formulaFn": "formulatwentysix"
                        },
                        {
                            "name": "Bag weight",
                            "formulalist": [{
                                "name": "Bag weight",
                                "fontsize": "12",
                                "formula": "{{Cut \\space  length*Width*Denier*(warp+weft) }\\over 1,80,000}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Cut length (inch)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Width (inch)', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Denier', "modelPropName": 'para3', "type": "number" },
                                { "placeholder": '', "name": 'Warp (per inch)', "modelPropName": 'para4', "type": "number" },
                                { "placeholder": '', "name": 'Weft (per inch)', "modelPropName": 'para5', "type": "number" },

                            ],
                            "unit":"gms",
                            "formulaFn": "formulatwentyseven"
                        },
                        {
                            "name": "Fabric GSM using variable Denier/Mesh",
                            "formulalist": [{
                                "name": "Fabric GSM using variable Denier/Mesh",
                                "fontsize": "12",
                                "formula": "{{Warp \\space tapes (per \\space m) * Warp \\space denier  + Weft \\space tapes (per \\space m) *Weft \\space denier}\\over 9000}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Warp tapes (per m)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Warp denier', "modelPropName": 'para2', "type": "number" },
                                { "placeholder": '', "name": 'Weft tapes (per m)', "modelPropName": 'para3', "type": "number" },
                                { "placeholder": '', "name": 'Weft denier', "modelPropName": 'para4', "type": "number" },

                            ],
                            "formulaFn": "formulatwentyeight"
                        },
                        {
                            "name": "No. of Warp Tapes (creel) required",
                            "formulalist": [{
                                "name": "No. of Warp Tapes (creel) required",
                                "fontsize": "12",
                                "formula": "{{ 2 * Fabric \\space DFL(mm)}\\over Warp \\space Tape \\space Width(mm)}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Fabric DFL (mm)', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'Warp tape width (mm)', "modelPropName": 'para2', "type": "number" },
                            
                            ],
                            "formulaFn": "formulatwentynine"
                        },
                        {
                            "name": "Group in Heddle Belt",
                            "formulalist": [{
                                "name": "Group in Heddle Belt",
                                "fontsize": "12",
                                "formula": "{{ Total \\space no. \\space of \\space warp \\space Tape}\\over No. \\space of \\space Heddle \\space Belt}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Total no. of warp tape', "modelPropName": 'para1', "type": "number" },
                                { "placeholder": '', "name": 'No. of heddle belt', "modelPropName": 'para2', "type": "number" },
                               
                            ],
                            "formulaFn": "formulathirty"
                        },
                        {
                            "name": "Mesh (per inch)",
                            "formulalist": [{
                                "name": "Mesh",
                                "fontsize": "12",
                                "formula": "{{25.4}\\over Tape \\space width (mm)}"
                            }],
                            "MY_DATA": [
                                { "placeholder": '', "name": 'Tape width (mm)', "modelPropName": 'para1', "type": "number" },
                               
                            ],
                            "formulaFn": "formulathirtyone"
                        },
                        
                        

                    ]
                }
            // ]
        }

    ]
}

