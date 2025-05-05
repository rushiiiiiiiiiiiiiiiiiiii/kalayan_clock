
export default function dialpositioner(Rangle) 
{
   let ringangle = 1200;
   let xorigin;
   let yorigin ;
   var Rangleint = parseInt(Rangle);
 //  Rangleint =Number(48);
   ringangle = Rangleint * 6 -61    
    xorigin = -45; yorigin = -35; 
  
  //  switch (Rangleint){
  //   case 0: xorigin = -20; yorigin = -25; break;
  //   case 1: xorigin = -27; yorigin = -25; break;
  //   case 2: xorigin = -24; yorigin = -25; break;
  //   case 3: xorigin = -23; yorigin = -25; break;
  //   case 4: xorigin = -21; yorigin = -20; break;
  //   case 5: xorigin = -19; yorigin = -20; break;
  //   case 6: xorigin = -17; yorigin = -20; break;
  //   case 7: xorigin = -15; yorigin = -20; break;
  //   case 8: xorigin = -13; yorigin = -20; break;
  //   case 9: xorigin = -11; yorigin = -19; break;
  //   case 10: xorigin = -9; yorigin = -16; break;
  //   case 11: xorigin = -10; yorigin = -11; break;
  //   case 12: xorigin = -7; yorigin = -9; break;
  //   case 13: xorigin = -4; yorigin = -9; break;
  //   case 14: xorigin = -5; yorigin = -5; break;
  //   case 15: xorigin = -8; yorigin = -2; break;
  //   case 16: xorigin = -9; yorigin = -2; break;
  //   case 17: xorigin = -9; yorigin = 2; break;
  //   case 18: xorigin = -9; yorigin = 2; break;
  //   case 19: xorigin = -9; yorigin = 5; break;
  //   case 20: xorigin = -9; yorigin = 8; break;
  //   case 21: xorigin = -9; yorigin = 9; break;
  //   case 22: xorigin = -9; yorigin = 9; break;
  //   case 23: xorigin = -9; yorigin = 10; break;
  //   case 24: xorigin = -15; yorigin = 10; break;
  //   case 25: xorigin = -15; yorigin = 15; break;
  //   case 26: xorigin = -18; yorigin = 18; break;
  //   case 27: xorigin = -20; yorigin = 20; break;
  //   case 28: xorigin = -22; yorigin = 23; break;
  //   case 29: xorigin = -27; yorigin = 25; break;
  //   case 30: xorigin = -30; yorigin = 25; break;
  //   case 31: xorigin = -30; yorigin = 25; break;
  //   case 32: xorigin = -30; yorigin = 25; break;

  //   case 33: xorigin = -30; yorigin = 25; break;
  //   case 34: xorigin = -40; yorigin = 25; break;
  //   case 35: xorigin = -40; yorigin = 24; break;
  //   case 36: xorigin = -40; yorigin = 22; break;
  //   case 37: xorigin = -40; yorigin = 19; break;
  //   case 38: xorigin = -45; yorigin = 16; break;
  //   case 39: xorigin = -50; yorigin = 13; break;
  //   case 40: xorigin = -54; yorigin = 10; break;
  //   case 41: xorigin = -50; yorigin = 10; break;
  //   case 42: xorigin = -50; yorigin = 9; break;
  //   case 43: xorigin = -50; yorigin = 0; break;
  //   case 44: xorigin = -50; yorigin = 0; break;
  //   case 45: xorigin = -50; yorigin = 0; break;
  //   case 46: xorigin = -53; yorigin = 0; break;
  //   case 47: xorigin = -55; yorigin = -5; break;
  //   case 48: xorigin = -55; yorigin = -5; break;
  //   case 49: xorigin = -55; yorigin = -5; break;
  //   case 50: xorigin = -55; yorigin = -5; break;
  //   case 51: xorigin = -40; yorigin =  -8; break;
  //   case 52: xorigin = -40; yorigin =  -10; break;
  //   case 53: xorigin = -40; yorigin =  -12; break;
  //   case 54: xorigin = -40; yorigin = -14; break;
  //   case 55: xorigin = -40; yorigin = -17; break;
  //   case 56: xorigin = -40; yorigin = -20; break;
  //   case 57: xorigin = -40; yorigin = -22; break;
  //   case 58: xorigin = -40; yorigin = -25; break;
  //   case 59: xorigin = -40; yorigin = -25; break;
   
  //   }
//     if ((Rangle >= 0) & (Rangle < 20)) { xorigin = (Rangle * 3 - 30); xorigin=30; }
//    if ((Rangle >= 20) & (Rangle < 30)) { xorigin = 50 - (Rangle); xorigin=30;}
//    if ((Rangle >= 30) & (Rangle < 50)) { xorigin = (Rangle) * (-3) + 70; }
//    if ((Rangle >= 50) & (Rangle < 60)) { xorigin = (Rangle) - 100; }
 
//    if ((Rangle >= 0) & (Rangle < 10)) { yorigin = (-1.5 * Rangle - 25); }
//    if ((Rangle >= 10) & (Rangle < 30)) { yorigin = (3 * Rangle - 70); }
//    if ((Rangle >= 30) & (Rangle < 40)) { yorigin = (Rangle - 10); }
//    if ((Rangle >= 40) & (Rangle < 50)) { yorigin = (-2 * Rangle + 90); }
//    if ((Rangle >= 50) & (Rangle < 60)) { yorigin = (-3.5 * Rangle + 110); }
   
  return [ringangle,xorigin,yorigin];
}


