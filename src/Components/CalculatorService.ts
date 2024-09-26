// CalculatorService.ts
import { useState } from 'react';

export const useCalculatorService = () => {
  const [subsection, setSubsection] = useState<any>(null);

  const sum = (a: number, b: number): number => a + b;

  const taplineOutput = (array: any): number => {
    return (Number(array.para1) * Number(array.para2) * Number(array.para3) * 60) / (9000 * 1000);
  };

  const unstretchedTapeWidth = (array: any): number => {
    return (Math.sqrt(Number(array.para1) / Number(array.para2)) * Number(array.para3)) + Number(array.para4);
  };

  const elongation = (array: any): number => {
    return ((Number(array.para1) - Number(array.para2)) / Number(array.para2)) * 100;
  };

  const tapeThickness = (array: any): number => {
    return (Number(array.para1) / (Number(array.para2) * Number(array.para3) * 9000)) * 1000;
  };

  const unstretchedTapeThickness = (array: any): number => {
    return (Math.sqrt(Number(array.para1) / Number(array.para2)) * Number(array.para3));
  };

  const denierSetting = (array: any): number => {
    return (Number(array.para1 * array.para2)) / Number(array.para3);
  };

  const relaxation = (array: any): number => {
    return ((Number(array.para1) - Number(array.para2)) / Number(array.para1)) * 100;
  };

  const gpd = (array: any): number => {
    return (Number(array.para1) / Number(array.para2)) * 1000;
  };

  const screwRpm = (array: any): number => {
    return (Number(array.para1) * Number(array.para2)) / Number(array.para3);
  };

  const usefulWidth = (array: any): number => Number(array.para1) - Number(array.para2);

  const numberOfTapes = (array: any): number => {
    return (Number(array.para1) - (Number(array.para2) * 2)) / Number(array.para3);
  };

  const spacerSizer = (array: any): number => {
    return ((Math.sqrt(Number(array.para1) / Number(array.para2))) * Number(array.para3)) - Number(array.para4);
  };

  const gearRatio = (array: any): number => {
    return (Number(array.para1) * Number(array.para2)) / (Number(array.para3) * Number(array.para4));
  };

  const dieSetting = (array: any): number => {
    return ((Number(array.para1) / Number(array.para2)) / Number(array.para3));
  };

  const picksperminute = (array: any): number => {
    return Number(array.para1) * Number(array.para2);
  };

  const loomoutput = (array: any): number => {
    return (1.524 * Number(array.para1)) / Number(array.para2);
  };

  const loomproductionsqm = (array: any): number => {
    return ((Number(array.para1) * 2) * Number(array.para2) * Number(array.para3)) / 100000;
  };

  const loomproductionm = (array: any): number => {
    return (Number(array.para1) * Number(array.para2)) / 1000;
  };

  const numberoflooms = (array: any): number => {
    return (Number(array.para1) * Number(array.para2)) / (Number(array.para3) * Number(array.para4));
  };

  const fabricgsm = (array: any): number => {
    return ((Number(array.para1) * Number(array.para2)) + (Number(array.para3) * Number(array.para4))) / 228.6;
  };

  const dfl = (array: any): number => 0.5 * Number(array.para1);

  const laminatedfabric = (array: any): number => {
    return ((2 * Number(array.para1)) / 3.14) + 8;
  };

  const unlaminatedfabric = (array: any): number => {
    return (2 * Number(array.para1)) / 3.14;
  };

  const denier = (array: any): number => {
    return (228.6 * Number(array.para1)) / (Number(array.para2) + Number(array.para3));
  };

  const gsm = (array: any): number => {
    return (Number(array.para1) * (Number(array.para2) + Number(array.para3))) / 228.6;
  };

  const gpm = (array: any): number => {
    return (Number(array.para1) * Number(array.para2)) / 19.68;
  };

  const bagweight = (array: any): number => {
    return (Number(array.para1) * Number(array.para2) * Number(array.para3) * (Number(array.para4) + Number(array.para5))) / 180000;
  };

  const fabricgsmcm = (array: any): number => {
    return ((Number(array.para1) * Number(array.para2)) + (Number(array.para3) * Number(array.para4))) / 9000;
  };

  const wraptapes = (array: any): number => {
    return (2 * Number(array.para1)) / Number(array.para2);
  };

  const heddlebelt = (array: any): number => Number(array.para1) / Number(array.para2);

  const mesh = (array: any): number => 25.4 / Number(array.para1);

  const sizeofring = (array: any): number => 16.17 * Number(array.para1);

  const stretchratio = (array: any): number => {
    return Number(array.para1) / Number(array.para2);
  };

  return {
    sum,
    taplineOutput,
    unstretchedTapeWidth,
    elongation,
    tapeThickness,
    unstretchedTapeThickness,
    denierSetting,
    relaxation,
    gpd,
    screwRpm,
    usefulWidth,
    numberOfTapes,
    spacerSizer,
    gearRatio,
    dieSetting,
    picksperminute,
    loomoutput,
    loomproductionsqm,
    loomproductionm,
    numberoflooms,
    fabricgsm,
    dfl,
    laminatedfabric,
    unlaminatedfabric,
    denier,
    gsm,
    gpm,
    bagweight,
    fabricgsmcm,
    wraptapes,
    heddlebelt,
    mesh,
    sizeofring,
    stretchratio,
  };
};
