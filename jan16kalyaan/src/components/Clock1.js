// import React, { useState, useEffect } from 'react';
// import '../css/Clock1.css'; // Assuming this file exists for styling
// import clockImage from '../assets/images/clock.png'; // Update the path accordingly
// import qrcode from '../assets/images/qrcode.svg'
// import innerClockImage from '../assets/images/D1.png'; // Update the path accordingly
// import axios from 'axios';
// import taaskata from '../assets/images/taaskata.png';
// import datefunction from '../components/dategiver.js';
// import converttime from '../components/timeconverter.js';
// import { Link } from 'react-router-dom';
// //import vedicdatefunction from '../components/dategiver.js';


// //array of kaalaayan info to show clock each n every info
// // const data = [
// //   {
// //     gregorianDate: "26 October 2024",
// //     indianDate: "4 Kartik 1946",
// //     vedicDate: "4 Urja 5126",
// //     day: "शनि",
// //     purnimantTithi: "कार्तिक कृ. १०",
// //     aamantTithi: "अश्विन कृ. १०",
// //     nakshatra: "आश्लेषा ९:४६",
// //     karan: "वणिज १६:२०",
// //     yog: "शुक्ल २९:५७",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत",
// //     suryodaya: "06:38",
// //     suryasta: "06:07"
// //   },
// //   {
// //     gregorianDate: "27 October 2024",
// //     indianDate: "5 Kartik 1946",
// //     vedicDate: "5 Urja 5126",
// //     day: "रवि",
// //     purnimantTithi: "कार्तिक कृ. ११",
// //     aamantTithi: "अश्विन कृ. ११",
// //     nakshatra: "मघा १२:२४",
// //     karan: "बव",
// //     yog: "ब्रह्मा",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत",
// //     suryodaya: "06:38",
// //     suryasta: "06:07"
// //   },
// //   {
// //     gregorianDate: "28 October 2024",
// //     indianDate: "6 Kartik 1946",
// //     vedicDate: "6 Urja 5126",
// //     day: "सोम",
// //     purnimantTithi: "कार्तिक कृ. ११",
// //     aamantTithi: "अश्विन कृ. ११",
// //     nakshatra: "पूर्वा १५:२४",
// //     karan: "बालव ७:५१",
// //     yog: "ब्रह्मा ६:४७",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत",
// //     suryodaya: "06:38",
// //     suryasta: "06:06"
// //   },
// //   {
// //     gregorianDate: "29 October 2024",
// //     indianDate: "7 Kartik 1946",
// //     vedicDate: "7 Urja 5126",
// //     day: "मंगल",
// //     purnimantTithi: "कार्तिक कृ. १२",
// //     aamantTithi: "अश्विन कृ. १२",
// //     nakshatra: "उत्तरा १८:३४",
// //     karan: "तैतिल १०:३२",
// //     yog: "ऐन्द्र ७:४८",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत",
// //     suryodaya: "06:39",
// //     suryasta: "06:06"
// //   },
// //   {
// //     gregorianDate: "30 October 2024",
// //     indianDate: "8 Kartik 1946",
// //     vedicDate: "8 Urja 5126",
// //     day: "बुध",
// //     purnimantTithi: "कार्तिक कृ. १३",
// //     aamantTithi: "अश्विन कृ. १३",
// //     nakshatra: "हस्त २१:४४",
// //     karan: "वणिज १३:१६",
// //     yog: "वैधृति ८:५१",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत",
// //     suryodaya: "06:39",
// //     suryasta: "06:05"
// //   },
// //   {
// //     gregorianDate: "31 October 2024",
// //     indianDate: "9 Kartik 1946",
// //     vedicDate: "9 Urja 5126",
// //     day: "गुरु",
// //     purnimantTithi: "कार्तिक कृ. १४",
// //     aamantTithi: "अश्विन कृ. १४",
// //     nakshatra: "चित्रा २४:४५",
// //     karan: "शकुनी १५:५३",
// //     yog: "विष्कभ ९:५०",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत",
// //     suryodaya: "06:40",
// //     suryasta: "06:05"
// //   },
// //   {
// //     gregorianDate: "01 November 2024",
// //     indianDate: "10 Kartik 1946",
// //     vedicDate: "10 Urja 5126",
// //     day: "शुक्र",
// //     purnimantTithi: "कार्तिक कृ. ३० (अमावस्या)",
// //     aamantTithi: "अश्विन कृ. ३० (अमावस्या)",
// //     nakshatra: "स्वाती २७:३१",
// //     karan: "नाग",
// //     yog: "प्रीति १०:४१",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत",
// //     suryodaya: "06:40",
// //     suryasta: "06:04"
// //   },
// //   {
// //     gregorianDate: "02 November 2024",
// //     indianDate: "11 Kartik 1946",
// //     vedicDate: "11 Urja 5126",
// //     day: "शनि",
// //     purnimantTithi: "कार्तिक शु. १",
// //     aamantTithi: "कार्तिक शु. १",
// //     nakshatra: "विशाखा २९:५८",
// //     karan: "किंस्तुघ्न ०७:२२",
// //     yog: "आयुष्मा ११:१८",
// //     suryodaya: "06:41",
// //     suryasta: "18:04",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "03 November 2024",
// //     indianDate: "12 Kartik 1946",
// //     vedicDate: "12 Urja 5126",
// //     day: "रवि",
// //     purnimantTithi: "कार्तिक शु. २",
// //     aamantTithi: "कार्तिक शु. २",
// //     nakshatra: "अनुराधा, अहोरात्र",
// //     karan: "बालव ०९:१७",
// //     yog: "सौभाग्य ११:३९",
// //     suryodaya: "06:41",
// //     suryasta: "18:03",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "4 November 2024",
// //     indianDate: "13 Kartik 1946",
// //     vedicDate: "13 Urja 5126",
// //     day: "सोम",
// //     purnimantTithi: "कार्तिक शु. ३",
// //     aamantTithi: "कार्तिक शु. ३",
// //     nakshatra: "अनुराधा ०८:०४",
// //     karan: "तैतिल १०:४८",
// //     yog: "शोभन ११:४३",
// //     suryodaya: "06:42",
// //     suryasta: "18:03",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "5 November 2024",
// //     indianDate: "14 Kartik 1946",
// //     vedicDate: "14 Urja 5126",
// //     day: "मंगल",
// //     purnimantTithi: "कार्तिक शु. ४",
// //     aamantTithi: "कार्तिक शु. ४",
// //     nakshatra: "ज्येष्ठा ०९:४५",
// //     karan: "वणिज ११:५४",
// //     yog: "अतीगंड ११:२७",
// //     suryodaya: "06:42",
// //     suryasta: "18:02",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "6 November 2024",
// //     indianDate: "15 Kartik 1946",
// //     vedicDate: "15 Urja 5126",
// //     day: "बुध",
// //     purnimantTithi: "कार्तिक शु. ५",
// //     aamantTithi: "कार्तिक शु. ५",
// //     nakshatra: "मूल ११:००",
// //     karan: "बव १२:३३",
// //     yog: "सुकर्मा १०:५१",
// //     suryodaya: "06:43",
// //     suryasta: "18:02",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "7 November 2024",
// //     indianDate: "16 Kartik 1946",
// //     vedicDate: "16 Urja 5126",
// //     day: "गुरु",
// //     purnimantTithi: "कार्तिक शु. ६",
// //     aamantTithi: "कार्तिक शु. ६",
// //     nakshatra: "पूर्वाषाढा ११:४७",
// //     karan: "कौलव १२:४२",
// //     yog: "धृती ०९:५१",
// //     suryodaya: "06:43",
// //     suryasta: "18:01",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "8 November 2024",
// //     indianDate: "17 Kartik 1946",
// //     vedicDate: "17 Urja 5126",
// //     day: "शुक्र",
// //     purnimantTithi: "कार्तिक शु. ७",
// //     aamantTithi: "कार्तिक शु. ७",
// //     nakshatra: "उत्तराषाढा",
// //     karan: "गर १२:२०",
// //     yog: "शूल ८:२७, गंड ३०:३८",
// //     suryodaya: "06:44",
// //     suryasta: "18:01",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "9 November 2024",
// //     indianDate: "18 Kartik 1946",
// //     vedicDate: "18 Urja 5126",
// //     day: "शनि",
// //     purnimantTithi: "कार्तिक शु. ८",
// //     aamantTithi: "कार्तिक शु. ८",
// //     nakshatra: "श्रवण ११:४८",
// //     karan: "विष्टि ११:२५",
// //     yog: "वृद्धी २८:२३",
// //     suryodaya: "06:44",
// //     suryasta: "18:01",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "10 November 2024",
// //     indianDate: "19 Kartik 1946",
// //     vedicDate: "19 Urja 5126",
// //     day: "रवि",
// //     purnimantTithi: "कार्तिक शु. ९",
// //     aamantTithi: "कार्तिक शु. ९",
// //     nakshatra: "धनिष्ठा",
// //     karan: "बालव ९:५८",
// //     yog: "ध्रुव २५:४२",
// //     suryodaya: "06:45",
// //     suryasta: "18:00",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "11 November 2024",
// //     indianDate: "20 Kartik 1946",
// //     vedicDate: "20 Urja 5126",
// //     day: "सोम",
// //     purnimantTithi: "कार्तिक शु. १०",
// //     aamantTithi: "कार्तिक शु. १०",
// //     nakshatra: "शत तारा ९:४०",
// //     karan: "तैतिल ७:५८",
// //     yog: "व्याघात २२:३६",
// //     suryodaya: "06:45",
// //     suryasta: "18:00",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "12 November 2024",
// //     indianDate: "21 Kartik 1946",
// //     vedicDate: "21 Urja 5126",
// //     day: "मंगल",
// //     purnimantTithi: "कार्तिक शु. ११",
// //     aamantTithi: "कार्तिक शु. ११",
// //     nakshatra: "पू. भा. ७:५२, उ. भा. २९:४०",
// //     karan: "विष्टि १६:०५",
// //     yog: "हर्षण १९:०९",
// //     suryodaya: "06:46",
// //     suryasta: "18:00",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "13 November 2024",
// //     indianDate: "22 Kartik 1946",
// //     vedicDate: "22 Urja 5126",
// //     day: "बुध",
// //     purnimantTithi: "कार्तिक शु. १२",
// //     aamantTithi: "कार्तिक शु. १२",
// //     nakshatra: "रेवती २७:११",
// //     karan: "बालव १३:०२",
// //     yog: "वज्र १५:२५",
// //     suryodaya: "06:46",
// //     suryasta: "18:00",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "14 November 2024",
// //     indianDate: "23 Kartik 1946",
// //     vedicDate: "23 Urja 5126",
// //     day: "गुरु",
// //     purnimantTithi: "कार्तिक शु. १३ / १४",
// //     aamantTithi: "कार्तिक शु. १३ / १४",
// //     nakshatra: "अश्विनी २४:३३",
// //     karan: "तैतिल ९:४४",
// //     yog: "सिद्धि ११:३०",
// //     suryodaya: "06:47",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "15 November 2024",
// //     indianDate: "24 Kartik 1946",
// //     vedicDate: "24 Urja 5126",
// //     day: "शुक्र",
// //     purnimantTithi: "कार्तिक शु. १५ (पौर्णिमा)",
// //     aamantTithi: "कार्तिक शु. १५ (पौर्णिमा)",
// //     nakshatra: "भरणी २१:५५",
// //     karan: "विष्टि १६:३८",
// //     yog: "व्यति. ७:३०, वरियान २७:३३",
// //     suryodaya: "06:47",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "16 November 2024",
// //     indianDate: "25 Kartik 1946",
// //     vedicDate: "25 Urja 5126",
// //     day: "शनि",
// //     purnimantTithi: "मार्गशीर्ष कृ. १",
// //     aamantTithi: "कार्तिक कृ. १",
// //     nakshatra: "कृत्तिका १९:२८",
// //     karan: "बालव १३:२२",
// //     yog: "परिघ २३:४७",
// //     suryodaya: "06:48",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "17 November 2024",
// //     indianDate: "26 Kartik 1946",
// //     vedicDate: "26 Urja 5126",
// //     day: "रवि",
// //     purnimantTithi: "मार्गशीर्ष कृ. २",
// //     aamantTithi: "कार्तिक कृ. २",
// //     nakshatra: "रोहिणी १७:२३",
// //     karan: "तैतिल १०:२५",
// //     yog: "शिव २०:२१",
// //     suryodaya: "06:48",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "18 November 2024",
// //     indianDate: "27 Kartik 1946",
// //     vedicDate: "27 Urja 5126",
// //     day: "सोम",
// //     purnimantTithi: "मार्गशीर्ष कृ. ३",
// //     aamantTithi: "कार्तिक कृ. ३",
// //     nakshatra: "मृग १५:४९",
// //     karan: "वणिज ७:५७",
// //     yog: "सिद्ध १७:२२",
// //     suryodaya: "06:49",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "19 November 2024",
// //     indianDate: "28 Kartik 1946",
// //     vedicDate: "28 Urja 5126",
// //     day: "मंगल",
// //     purnimantTithi: "मार्गशीर्ष कृ. ४",
// //     aamantTithi: "कार्तिक कृ. ४",
// //     nakshatra: "आर्द्रा १४:५६",
// //     karan: "बालव १७:२९",
// //     yog: "साध्य १४:५६",
// //     suryodaya: "06:49",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "20 November 2024",
// //     indianDate: "29 Kartik 1946",
// //     vedicDate: "29 Urja 5126",
// //     day: "बुध",
// //     purnimantTithi: "मार्गशीर्ष कृ. ५",
// //     aamantTithi: "कार्तिक कृ. ५",
// //     nakshatra: "पुनर्वसु १४:५०",
// //     karan: "तैतिल १६:५०",
// //     yog: "शुभ १३:०८",
// //     suryodaya: "06:50",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "21 November 2024",
// //     indianDate: "30 Kartik 1946",
// //     vedicDate: "30 Urja 5126",
// //     day: "गुरु",
// //     purnimantTithi: "मार्गशीर्ष कृ. ६",
// //     aamantTithi: "कार्तिक कृ. ६",
// //     nakshatra: "पुष्य १५:३६",
// //     karan: "वणिज १७:०४",
// //     yog: "शुक्ल १२:०१",
// //     suryodaya: "06:51",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "22 November 2024",
// //     indianDate: "01 Agrahayan 1946",
// //     vedicDate: "01 Saha 5126",
// //     day: "शुक्र",
// //     purnimantTithi: "मार्गशीर्ष कृ. ७",
// //     aamantTithi: "कार्तिक कृ. ७",
// //     nakshatra: "आश्लेषा १७:१०",
// //     karan: "बव",
// //     yog: "ब्रह्मा ११:३४",
// //     suryodaya: "06:51",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "23 November 2024",
// //     indianDate: "02 Agrahayan 1946",
// //     vedicDate: "02 Saha 5126",
// //     day: "शनि",
// //     purnimantTithi: "मार्गशीर्ष कृ. ८",
// //     aamantTithi: "कार्तिक कृ. ८",
// //     nakshatra: "मघा १९:२७",
// //     karan: "बालव ६:५८",
// //     yog: "ऐंद्र ११:४१",
// //     suryodaya: "06:52",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "24 November 2024",
// //     indianDate: "03 Agrahayan 1946",
// //     vedicDate: "03 Saha 5126",
// //     day: "रवि",
// //     purnimantTithi: "मार्गशीर्ष कृ. ९",
// //     aamantTithi: "कार्तिक कृ. ९",
// //     nakshatra: "पूर्वा २२:१७",
// //     karan: "तैतिल ९:०६",
// //     yog: "वैधृति १२:१७",
// //     suryodaya: "06:52",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "25 November 2024",
// //     indianDate: "04 Agrahayan 1946",
// //     vedicDate: "04 Saha 5126",
// //     day: "सोम",
// //     purnimantTithi: "मार्गशीर्ष कृ. १०",
// //     aamantTithi: "कार्तिक कृ. १०",
// //     nakshatra: "उत्तरा २५:२४",
// //     karan: "वणिज ११:४०",
// //     yog: "विष्कम्भ १३:११",
// //     suryodaya: "06:53",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "26 November 2024",
// //     indianDate: "05 Agrahayan 1946",
// //     vedicDate: "05 Saha 5126",
// //     day: "मंगल",
// //     purnimantTithi: "मार्गशीर्ष कृ. ११",
// //     aamantTithi: "कार्तिक कृ. ११",
// //     nakshatra: "हस्त २८:३५",
// //     karan: "बव १४:२६",
// //     yog: "प्रीति १४:१३",
// //     suryodaya: "06:54",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "27 November 2024",
// //     indianDate: "06 Agrahayan 1946",
// //     vedicDate: "06 Saha 5126",
// //     day: "बुध",
// //     purnimantTithi: "मार्गशीर्ष कृ. १२",
// //     aamantTithi: "कार्तिक कृ. १२",
// //     nakshatra: "चित्रा, अहोरात्र",
// //     karan: "कौलव १७:०८",
// //     yog: "आयुष्मान १५:१३",
// //     suryodaya: "06:54",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "28 November 2024",
// //     indianDate: "07 Agrahayan 1946",
// //     vedicDate: "07 Saha 5126",
// //     day: "गुरु",
// //     purnimantTithi: "मार्गशीर्ष कृ. १३",
// //     aamantTithi: "कार्तिक कृ. १३",
// //     nakshatra: "चित्रा ७:३६",
// //     karan: "गर सौभाग्य १६:०१",
// //     yog: "६:५५",
// //     suryodaya: "06:55",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "29 November 2024",
// //     indianDate: "08 Agrahayan 1946",
// //     vedicDate: "08 Saha 5126",
// //     day: "शुक्र",
// //     purnimantTithi: "मार्गशीर्ष कृ. १३",
// //     aamantTithi: "कार्तिक कृ. १३",
// //     nakshatra: "स्वाती १०:१८",
// //     karan: "वणिज ८:४०",
// //     yog: "शोभन १६:३३",
// //     suryodaya: "06:56",
// //     suryasta: "17:58",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "30 November 2024",
// //     indianDate: "09 Agrahayan 1946",
// //     vedicDate: "09 Saha 5126",
// //     day: "शनि",
// //     purnimantTithi: "मार्गशीर्ष कृ. १४",
// //     aamantTithi: "कार्तिक कृ. १४",
// //     nakshatra: "विशाखा १२:३५",
// //     karan: "शकुन १०:३०",
// //     yog: "अतीगंड १६:४४",
// //     suryodaya: "06:56",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   },
// //   {
// //     gregorianDate: "01 December 2024",
// //     indianDate: "10 Agrahayan 1946",
// //     vedicDate: "10 Saha 5126",
// //     day: "रवि",
// //     purnimantTithi: "मार्गशीर्ष कृ. ३० (अमावस्या)",
// //     aamantTithi: "कार्तिक कृ. ३० (अमावस्या)",
// //     nakshatra: "अनुराधा १४:२४",
// //     karan: "नाग ११:५१",
// //     yog: "सुकर्मा १६:३३",
// //     suryodaya: "06:57",
// //     suryasta: "17:59",
// //     ayan: "दक्षिणायन",
// //     rutu: "हेमंत"
// //   }
// // ];


// const Clock = () => {
//   const [time, setTime] = useState(new Date());
//   const [todaysData, setTodaysData] = useState({});

//   //hooks for advertise
//   const [advertisements, setAdvertisements] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [adverror, advsetError] = useState(null);

// //logic for advertise
// useEffect(() => {
//   const fetchAdvertisements = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/advertise');
//       setAdvertisements(response.data.data);
//     } catch (err) {
//       advsetError(err.response ? err.response.data.message : 'Error fetching advertisements');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchAdvertisements();
// }, []);

// // if (loading) {
// //   return <div>Loading...</div>;
// // }

// // if (adverror) {
// //   return <div>Error: {error}</div>;
// // }

//   // hooks for notification
//   const [notifications, setNotifications] = useState([]);
//   const [error, setError] = useState(null);

//     // logic for notification change
//     const fetchNotification = async () => {
//       try {
//         const response = await fetch('http://192.168.0.108:5100/Get_notification/'+sessionStorage.getItem("userid"));
//         const data = await response.json();
//         if (data.length > 0) {
//           console.log(data[0].Marathi_text)
//           setNotifications(data); // Display the most recent notification's info
//         } else {
//           setNotifications('No notifications available');
//         }
//         if (!response.ok) {
//           throw new Error(`Error: ${response.statusText}`);
//         }

//       } catch (error) {
//         setError(error.message);
//       }
//     };
//   useEffect(() => {
//     // Function to fetch data from the A
//     fetchNotification();
//   }, []);
//   const getdata = async () => {
//     try {
//       const response = await fetch("http://192.168.0.108:5100/get_data");
//       const result = await response.json()
//       setTodaysData(result)
//     } catch (error) {
//       console.log(error)
//     }

//   }
//   useEffect(() => {
//     getdata();
//   }, [])
//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setTime(new Date());
//     }, 200); // Update time every second

//     return () => clearInterval(timerId); // Cleanup the interval on component unmount
//   }, []);

//   //this hook is used to show the info related to current date



//   function isOdd(num) { return num % 2; }

//   // const formatTime = (date) => {
//   //   return date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
//   // };

//   // const formatDate = (date) => {
//   //   return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
//   // };

//   const now = new Date();
//   // Extract the hours, minutes, and seconds
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const seconds = now.getSeconds();

//   //diff = 1611 seconds
//   const now_loc = new Date(now - 1611000);
//   const hours_loc = now_loc.getHours();
//   const minutes_loc = now_loc.getMinutes();
//   const seconds_loc = now_loc.getSeconds();

//   const decisec = Math.round((now.getSeconds() * 10 + now.getMilliseconds() / 100) / 4)
//   let vipals = decisec % 60;
//   const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
//   const currentTimeInMinutes = totalMinutes
//   const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM

//   let adjustedMinutes;
//   if (minutesSince6AM < 0) {
//     // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
//     adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
//   } else {
//     adjustedMinutes = minutesSince6AM;
//   }
//   //const  = adjustedMinutes / 24; // 1 ghatika = 24 minutes
//   const ghatika = Math.floor(adjustedMinutes / 24); // 1 ghatika = 24 minutes

//   let ghatikapart = adjustedMinutes % 24;
//   if (isOdd(hours)) { ghatikapart = (adjustedMinutes + 60) % 24; } else { ghatikapart = adjustedMinutes % 24; }
//   let pal_basic = Math.floor(ghatikapart / 2) * 5;
//   // pal_basic = ghatikapart*2.5
//   //const ghatikaPart = Math.floor(ghatika); // Whole ghatikas
//   //const pal =  (ghatika - ghatikaPart) * 60; // Remaining part in pal (60 pal = 1 ghatika)
//   const pal_in_two_min = Math.floor((parseInt(seconds) + 60 * isOdd(minutes)) / 24);
//   const pal = pal_basic + pal_in_two_min;

//   if (isOdd(minutes)) { vipals = ((decisec + 31) % 60); } else { vipals = (decisec % 60); }
//   const ghatikaCount = ghatika;
//   let palCount = pal; //Math.floor((totalSeconds % 1440) / 24); // 1 Pal = 24 seconds (0.4 minutes)
//   let vipalCount = vipals; // 1 Vipal = 0.4 seconds

//   // converttime(1)[0]
//   const ghatika_loc = converttime(1)[0];//ghatika;
//   let pal_loc = converttime(1)[1];//pal; 
//   let vipal_loc = converttime(1)[2]; //vipals; 

//   // Rotation calculations for dials
//   const ghatikaRotation = (ghatikaCount % 60) * (360 / 60) - 90; // 30 Ghatikas in 12 hours
//   const palRotation = (palCount % 60) * (360 / 60) - 90; // 60 Pals in 1 Ghatika
//   let vipalRotation = (vipalCount) * (360 / 60) - 90; // 60 Vipals in 1 Pal
//   // if (vipalRotation>320) {vipalRotation=0;}

//   let date = time.getDate();
//   if (hours < 6) { date = date - 1; }    //ensure datechanged only at 6 am
//   let indianDate = datefunction(date)[0];//"  25 Ashwin 1946"
//   let vedicDate = datefunction(date)[1]; //"25 Isha Maas 5126"

//   let originX = -30;// + 20*Math.sin(seconds*6);
//   let originY = -25;//Math.sin(seconds*6);
//   let Rangle = ghatikaCount + 30.1;
//   let Ring_rotation = Rangle * 6;
//   if ((Rangle >= 0) & (Rangle < 20)) { originX = (Rangle * 3 - 30); }
//   if ((Rangle >= 20) & (Rangle < 30)) { originX = 50 - (Rangle); }
//   if ((Rangle >= 30) & (Rangle < 50)) { originX = (Rangle) * (-3) + 110; }
//   if ((Rangle >= 50) & (Rangle < 60)) { originX = (Rangle) - 90; }

//   if ((Rangle >= 0) & (Rangle < 10)) { originY = (-1.5 * Rangle - 25); }
//   if ((Rangle >= 10) & (Rangle < 30)) { originY = (3 * Rangle - 70); }
//   if ((Rangle >= 30) & (Rangle < 40)) { originY = (Rangle - 10); }
//   if ((Rangle >= 40) & (Rangle < 50)) { originY = (-2 * Rangle + 110); }
//   if ((Rangle >= 50) & (Rangle < 60)) { originY = (-3.5 * Rangle + 185); }

//   let thekaran = "विष्टी"
//   let theyog = "he"
//   let thenaxatra = "he"

//   const gregdate = new Date().toDateString(); // This will return something like "Sun Nov 04 2024"
// const commaSeparatedDate = gregdate.split(' ').join(', '); // Splitting by spaces and joining with ', '


//   return (
//     <>
//     <nav className='w-full'>
//       <ul>
//         <Link to={"/bg"} className='text-black font-3xl absolut left-0 top-0 w-full'>Change Bg</Link>
//       </ul>
//     </nav>

//       <div className='container-fluid main '>
//         <h3 className='text-danger fs-1 font-weight-bold'> ||  कालायन  || </h3>
//         <br></br>
//         {/* clock dial */}
//         <div className="container-fluid clock-container mt-1">
//           {/* Clock Dial */}

//           <div className="clock" >
//             {/* Background Image for Kalayan Clock */}
//             {/*<div className="clock-background" style={{ transform: ` translateX(-35px) translateY(-25px) rotate(90deg)` }}>*/}
//             <div className="clock-background" style={{ transform: ` translateX(${originX}px) translateY(${originY}px) rotate(${Ring_rotation}deg)` }}>
//               <img src={clockImage} alt="Kalayan Clock" className="clock-background" /></div>

//             {/* Inner Image for the clock */}
//             {

//               localStorage.getItem("bg")?
//             <img src={localStorage.getItem("bg")} alt="Inner Circle" className="inner-clock-background  border-black-3 rounded-4xl" />
//               :<img src={innerClockImage} alt="Inner Circle" className="inner-clock-background" />
//             }

//             {/* Ghatika Dial */}
//             <div className="dial ghatika" style={{ transform: `translateX(-50%) translateY(-100%) rotate(${ghatikaRotation}deg)` }}><img src={taaskata} className='taskata' /></div>

//             {/* Pal Dial */}
//             <div className="dial pal" style={{ transform: `translateX(-50%) translateY(-100%) rotate(${palRotation}deg)` }}></div>

//             {/* Vipal Dial */}

//             <div className="dial vipal" style={{ transform: `translateX(-50%) translateY(-100%) rotate(${vipalRotation}deg)` }}></div>
//           </div>
//         </div>

//         {/* Ayan Section */}
//         <section className='container-fluid suryoast d-flex  gap-5  align-items-center'>

//           <div className='suryoday'>
//             <table >
//               <tbody>
//                 <tr>
//                   <th className='bg-white text-dark'>अयन </th> <span> : </span>
//                   <td className='setrise bg-danger text-white button p-2 border-bottom rounded'>{todaysData?.[0]?.Ayan}</td>
//                 </tr>
//                 <tr>
//                   <th className='bg-white text-dark'>सूर्योदय </th><span>: </span>
//                   <td className='setrise bg-danger text-white button p-2 rounded'> {todaysData?.[0]?.Suryoday}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>


//           <div className='suryast'>
//             <table>
//               <tbody>
//                 <tr>
//                   <th className='bg-white text-dark'>ऋतू </th> <span className='font-weight-bold mr-2'> : </span>
//                   <td className='setrise bg-danger text-white button p-2 border-bottom rounded'>{todaysData?.[0]?.Rutu}</td>
//                 </tr>
//                 <tr>
//                   <th className='bg-white text-dark'>सूर्यास्त </th> <span className='font-weight-bold mr-2'> : </span>

//                   <td className='setrise bg-danger text-white button p-2 rounded'> {todaysData?.[0]?.Suryasta}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>

//         </section>

//         {/* Time Tables Section */}

//         {/* First Table Section */}
//         <div className="container-fluid  d-flex vedind gap-0 justify-content-between">
//           {/* First Table */}
//           {/* <div className="time-panel div-ved col-6"> */}
//           <table className="table">
//             <thead className="custom-header">
//               <tr>
//                 <th></th>
//                 <th>Ghati</th>
//                 <th>Pal</th>
//                 <th>Vipal</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className='border-bottom border-dark'>
//                 <td>Std</td>
//                 <td>{ghatikaCount}</td>
//                 <td>{palCount}</td>
//                 <td>{vipalCount}</td>
//               </tr>
//               <tr className='text-dark'>
//                 <td>Loc</td>
//                 <td>{ghatika_loc}</td>
//                 <td>{pal_loc}</td>
//                 <td>{vipal_loc}</td>
//               </tr>
//             </tbody>
//           </table>
//           {/* </div> */}

//           {/* Second Table */}
//           {/* <div className="time-panel div-ind col-6"> */}
//           <table className="table">
//             <thead className="custom-header">
//               <tr>
//                 <th></th>
//                 <th>HH</th>
//                 <th>MM</th>
//                 <th>SS</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className='border-bottom border-dark'>
//                 <td>Std</td>
//                 <td>{hours}</td>
//                 <td>{minutes}</td>
//                 <td>{seconds}</td>
//               </tr>
//               <tr>
//                 <td>Loc</td>
//                 <td>{hours_loc}</td>
//                 <td>{minutes_loc}</td>
//                 <td>{seconds_loc}</td>
//               </tr>
//             </tbody>
//           </table>
//           {/* </div> */}
//         </div>

//         {/* Tithi Table */}

//         {/* <div className="container-fluid  tithi text-white"> */}
//         <table className="table tithitable">
//           <tbody>

//             <tr className='custom-border'>
//               <td className='tithitd'>पूर्णिमांत तिथी 
//               </td>
//               <td className='text-start'> <span className='tithivalue'>{todaysData?.[0]?.Purnimant_tithi}</span>
//               </td>
//               <td></td>
//               <td></td>

//               <td className='tithitd'>आमांत तिथी </td>
//               <td><span className='tithivalue'>{todaysData?.[0]?.Amant_tithi}</span></td>

//             </tr>
//             <tr className='custom-border'>
//               <td className='tithitd'>नक्षत्र</td>
//               <td> <span className='tithivalue'>{todaysData?.[0]?.Nakshatra}</span></td>
//               <td className='tithitd'>करण</td>
//               <td><span className='tithivalue'>{todaysData?.[0]?.Karan}</span></td>
//               <td className='tithitd'>योग  
//               </td>
//               <td><span className='tithivalue'>{todaysData?.[0]?.Yog}    </span></td>
//             </tr>
//             <tr>
//               <td >दिनविशेष</td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//               <td></td>
//             </tr>
//           </tbody>
//         </table>
//         {/* </div> */}


//         {/* ind ved greg time section  */}

// <div className='d-flex justify-content-between qrindved'>
// <table className="table indvedgreg w-50 table-bordered table-striped table-hover">
//           <tbody>
//             <tr>
//               <th className='bg-dark text-white'>Indian Date</th>
//               <td>{todaysData?.[0]?.Indian_date}</td>
//             </tr>
//             <tr>
//               <th className='bg-dark text-white'>Vedic Date</th>
//               <td>{todaysData?.[0]?.Vedic_date}</td>
//             </tr>
//             <tr>
//               <th className='bg-dark text-white'>Greg. Date</th>
//               <td>{commaSeparatedDate}</td>
//             </tr>
//           </tbody>
//     </table>

// <div>
// <img src={qrcode} alt="Kalayan Clock" className="" />
// </div>
// </div>



//         {/* Notification */}
//         <div className='container-fluid notification  border border-success  bg-success'>

//         {error && <p style={{ color: 'red' }}>Error: {error}</p>}
//       <p className='text-white w-full text-center'>{notifications?.[0]?.Marathi_text}</p>
//         </div>

//         <div className='container-fluid adv mt-1 border border-dark'>
//         {advertisements.map((ad) => (
//           <div key={ad.id} className="advertisement-item">
//             <h3>{ad.info}</h3>
//             <img
//               src={`http://localhost:4000/uploads/${ad.adv_file}`} // Adjust the path based on your setup
//               alt={ad.info}
//               style={{ width: '200px', height: '200px' }} // You can adjust the styles as needed
//             />
//             <p>Created At: {new Date(ad.created_at).toLocaleString()}</p>
//           </div>
//         ))}
//         </div>
//       </div>
//     </>
//   );
// };
// // C:\Users\Acer\Downloads\kalayan28\backend\uploads\mediaFile-1730725252308.jpeg
// export default Clock;


import React, { useState, useEffect } from 'react';
import '../css/Clock1.css'; // Assuming this file exists for styling
import clockImage from '../assets/images/clock.png'; // Update the path accordingly
import qrcode from '../assets/images/qrcode.svg'
import innerClockImage from '../assets/images/D1.png'; // Update the path accordingly
import axios, { getAdapter } from 'axios';
import taaskata from '../assets/images/taskata24.png';
import minkata from '../assets/images/minkata.png';
import spotImage from '../assets/images/spot.png';
import datefunction from '../components/dategiver.js';
import converttime from '../components/timeconverter.js';
import Modal from './Modal.js';
import adver from "../assets/images/vicco.jpg";
import VerticalProgressBar from './Progrressbar.js';
import dialpositioner from './dialposition.js';
//import vedicdatefunction from '../components/dategiver.js';

const Clock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notify, stenotify] = useState()
  const [data, setadata] = useState([])
  const [time, setTime] = useState(new Date());
  const [todaysData, setTodaysData] = useState({});

  //hooks for advertise
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adverror, advsetError] = useState(null);
  const hostaddres = "http://192.168.0.108:5100/"

  //logic for advertise
  const getdata = async () => {
    try {
      const response = await fetch(hostaddres + "get_data");
      const result = await response.json()
      setadata(result)
    } catch (error) {
      console.log(error)
    }

  }

  const Notification = async () => {
    try {
      const response = await fetch(hostaddres + "Get_notification")
      const result = await response.json();
      stenotify(result[0])

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getdata();
    Notification()
    console.log(notify);
  }, [])

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await axios.get(hostaddres + "advertise");      // change port to 4000
        setAdvertisements(response.data.data);
      } catch (err) {
        advsetError(err.response ? err.response.data.message : 'Error fetching advertisements');
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (adverror) {
  //   return <div>Error: {error}</div>;
  // }

  // hooks for notification
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // logic for notification change


  useEffect(() => {
    console.log(data)
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 200); // Update time every second

    return () => clearInterval(timerId); // Cleanup the interval on component unmount
  }, []);

  const fetchNotification = async () => {
    try {
      const response = await fetch('http://192.168.0.108:5100/Get_notification/' + sessionStorage.getItem("userid"));
      const data = await response.json();
      if (data.length > 0) {
        console.log(data[0].Marathi_text)
        setNotifications(data); // Display the most recent notification's info
      } else {
        setNotifications('No notifications available');
      }
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    // Function to fetch data from the A
    fetchNotification();
  }, []);
  //this hook is used to show the info related to current date
  useEffect(() => {
    const updateTodaysData = () => {
      const now = new Date();
      const todayString = now.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const todayData = data.find((item) => item.gregorianDate === todayString) || {};
      setTodaysData(todayData);
    };

    updateTodaysData(); // Call the function to get today's data

    const dateChangeInterval = setInterval(updateTodaysData, 60 * 1000); // Update every minute

    return () => clearInterval(dateChangeInterval);
  }, []);


  function isOdd(num) { return num % 2; }

  // const formatTime = (date) => {
  //   return date.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour12: true });
  // };

  // const formatDate = (date) => {
  //   return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  // };

  const now = new Date();
  // Extract the hours, minutes, and seconds
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  //diff = 1611 seconds
  const now_loc = new Date(now - 1611000);
  const hours_loc = now_loc.getHours();
  const minutes_loc = now_loc.getMinutes();
  const seconds_loc = now_loc.getSeconds();

  const decisec = Math.round((now.getSeconds() * 10 + now.getMilliseconds() / 100) / 4)
  let vipals = decisec % 60;
  const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
  const currentTimeInMinutes = totalMinutes
  const minutesSince6AM = currentTimeInMinutes - 6 * 60; // Calculate time passed since 6:00 AM

  let adjustedMinutes;
  if (minutesSince6AM < 0) {
    // If the time is before 6:00 AM, consider it part of the previous day's Vedic time
    adjustedMinutes = minutesSince6AM + 24 * 60; // Add 24 hours (1440 minutes)
  } else {
    adjustedMinutes = minutesSince6AM;
  }
  //const  = adjustedMinutes / 24; // 1 ghatika = 24 minutes
  const ghatika = Math.floor(adjustedMinutes / 24); // 1 ghatika = 24 minutes

  let ghatikapart = adjustedMinutes % 24;
  if (isOdd(hours)) { ghatikapart = (adjustedMinutes + 60) % 24; } else { ghatikapart = adjustedMinutes % 24; }
  let pal_basic = Math.floor(ghatikapart / 2) * 5;
  // pal_basic = ghatikapart*2.5
  //const ghatikaPart = Math.floor(ghatika); // Whole ghatikas
  //const pal =  (ghatika - ghatikaPart) * 60; // Remaining part in pal (60 pal = 1 ghatika)
  const pal_in_two_min = Math.floor((parseInt(seconds) + 60 * isOdd(minutes)) / 24);
  const pal = pal_basic + pal_in_two_min;

  if (isOdd(minutes)) { vipals = ((decisec + 31) % 60); } else { vipals = (decisec % 60); }
  const ghatikaCount = ghatika;
  let palCount = pal; //Math.floor((totalSeconds % 1440) / 24); // 1 Pal = 24 seconds (0.4 minutes)
  let vipalCount = vipals; // 1 Vipal = 0.4 seconds

  // converttime(1)[0]
  const ghatika_loc = converttime(1)[0];//ghatika;
  let pal_loc = converttime(1)[1];//pal; 
  let vipal_loc = converttime(1)[2]; //vipals; 

  // Rotation calculations for dials
  const ghatikaRotation = (ghatikaCount % 60) * (360 / 60) - 90; // 30 Ghatikas in 12 hours
  const palRotation = (palCount % 60) * (360 / 60) - 90; // 60 Pals in 1 Ghatika
  let vipalRotation = (vipalCount) * (360 / 60) - 90; // 60 Vipals in 1 Pal
  // if (vipalRotation>320) {vipalRotation=0;}

  let date = time.getDate();
  if (hours < 6) { date = date - 1; }    //ensure datechanged only at 6 am
  let indianDate = datefunction(date)[0];//"  25 Ashwin 1946"
  let vedicDate = datefunction(date)[1]; //"25 Isha Maas 5126"

  let originX = -30;// + 20*Math.sin(seconds*6);
  let originY = -25;//Math.sin(seconds*6);
  //var Rangle = Number(ghatikaCount) + 30;
  let Rangle = Number(ghatikaCount)
  let Ring_rotation = Rangle * 6;



  [Ring_rotation, originX, originY] = dialpositioner(Rangle);

  let thekaran = "विष्टी"
  let theyog = "he"
  let thenaxatra = "he"

  const gregdate = new Date().toDateString(); // This will return something like "Sun Nov 04 2024"
  const commaSeparatedDate = gregdate.split(' ').join(', '); // Splitting by spaces and joining with ', '

  const Openmodal = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>

      <div className='container-fluid main '>
        <nav className='w-full '>
          <button className='absolute right-0' onClick={Openmodal}>
            <i class="bi bi-list text-4xl"></i>
          </button>
        </nav>
        <Modal open={isOpen} close={setIsOpen} />
        <h3 className='text-danger fs-1 font-weight-bold w-full text-center mb-6'> ||  कालायन  || </h3>
        <br></br>
        <div className="container-fluid clock-container mt-1">
          {/* Clock Dial */}

          <div className="clock" >
            {/* Background Image for Kalayan Clock */}

            <div className="clock-background" style={{ transform: ` translateX(${originX}px) translateY(${originY}px) rotate(${Ring_rotation}deg)` }}>
              <img src={clockImage} alt="Kalayan Clock" className="clock-background" /></div>

            {/* Inner Image for the clock */}
            {

              localStorage.getItem("bg") ?
                <img src={localStorage.getItem("bg")} alt="Inner Circle" className="inner-clock-background" />
                : <img src={innerClockImage} alt="Inner Circle" className="inner-clock-background" />
            }



            {/* Vipal Dial */}

            <div className="dial vipal" style={{ transform: `translateX(-50%) translateY(-100%) rotate(${vipalRotation}deg)` }}></div>

            {/* Pal Dial */}
            {/* <div className="dial pal" style={{ transform: `translateX(-50%) translateY(-100%) rotate(${palRotation}deg)` }}></div> */}
            <div className="dial"> <div className="minkata" style={{ transform: `translateX(-50%) translateY(-100%) rotate(${palRotation}deg)` }}><img src={minkata} /></div></div>
            {/* Ghatika Dial */}
            <div className="dial"> <div className="taskata" style={{ transform: `translateX(-50%) translateY(0%)  rotate(${ghatikaRotation + 180}deg)` }}> <img src={taaskata} /></div></div>

          </div>
          {/* <div className="clockcenter" style={{ transform: ` translateX(00px) translateY(-220px) ` }}>
               <img src={spotImage} alt="Kalayan spot" className="clockcenter" /></div> */}
        </div>


        {/* Ayan Section */}
        <section className='absolute top-[-35%] left-[10%]'>
          <VerticalProgressBar />
        </section>
        <section className='container-fluid suryoast d-flex  gap-5  align-items-center'>

          <div className='suryoday'>
            <table >
              <tbody>
                <tr>

                  <th className='bg-white text-dark'>अयन  </th> <span> : </span>
                  <td className='setrise bg-[purple] text-white button p-2 border-bottom rounded'>{data.length > 0 ? data[0].Ayan : ""}</td>
                </tr>
                <tr>
                  <th className='bg-white text-dark'>सूर्योदय </th><span> : </span>
                  <td className='setrise bg-[purple] text-white button p-2 rounded'> {data.length > 0 ? data[0].Suryoday : ""} AM</td>
                </tr>
              </tbody>
            </table>
          </div>


          <div className='suryast'>
            <table>
              <tbody>
                <tr>
                  <th className='bg-white text-dark'>ऋतू  </th> <span className='font-weight-bold mr-2'> : </span>
                  <td className='setrise bg-[purple] text-white button p-2 border-bottom rounded'>{data.length > 0 ? data[0].Rutu : ""}</td>
                </tr>
                <tr>
                  <th className='bg-white text-dark'>सूर्यास्त   </th> <span className='font-weight-bold mr-2'> : </span>

                  <td className='setrise bg-[purple] text-white button p-2 rounded'> {data.length > 0 ? data[0].Suryasta : ""} PM</td>
                </tr>
              </tbody>
            </table>
          </div>

        </section>

        {/* Time Tables Section */}

        {/* First Table Section */}
        <div className="container-fluid  d-flex vedind gap-0 justify-content-between w-full h-[211px]">
          {/* First Table */}
          {/* <div className="time-panel div-ved col-6"> */}
          <table className="table">
            <thead className="custom-header">
              <tr>
                <th></th>
                <th>Ghati</th>
                <th>Pal</th>
                <th>Vipal</th>
              </tr>
            </thead>
            <tbody>
              <tr className='border-bottom border-dark'>
                <td>Std</td>
                <td>{ghatikaCount < 10 ? "0" + ghatikaCount : ghatikaCount}</td>
                <td>{palCount < 10 ? "0" + palCount : palCount}</td>
                <td>{vipalCount < 10 ? "0" + vipalCount : vipalCount}</td>
              </tr>
              <tr className='text-dark'>
                <td>Loc</td>
                <td>{ghatika_loc < 10 ? "0" + ghatika_loc : ghatika_loc}</td>
                <td>{pal_loc < 10 ? "0" + pal_loc : pal_loc}</td>
                <td>{vipal_loc < 10 ? "0" + vipal_loc : vipal_loc}</td>
              </tr>
            </tbody>
          </table>

          {/* Second Table */}
          {/* </div> */}
          {/* <div className="time-panel div-ind col-6"> */}
          <table className="table">
            <thead className="custom-header">
              <tr>
                <th ></th>
                <th >HH</th>
                <th >MM</th>
                <th >SS</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-bottom border-dark">
                <td>Std</td>
                <td>{hours < 10 ? "0" + hours : hours}</td>
                <td>{minutes < 10 ? "0" + minutes : minutes}</td>
                <td>{seconds < 10 ? "0" + seconds : seconds}</td>
              </tr>
              <tr className="text-dark">
                <td>Loc</td>
                <td>{hours_loc < 10 ? "0" + hours_loc : hours_loc}</td>
                <td>{minutes_loc < 10 ? "0" + minutes_loc : minutes_loc}</td>
                <td>{seconds_loc < 10 ? "0" + seconds_loc : seconds_loc}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Tithi Table */}
        <table className="table tithitable bg-purple-900 text-white shadow-lg rounded-lg mt-[-15px]">
          <tbody>
            <tr className="custom-border">
              <td className="tithitd py-3">
                <strong>पूर्णिमांत तिथी:</strong>
                <span className="tithivalue">{data.length > 0 ? data[0].Purnimant_tithi : ""}</span>
              </td>
              <td className="tithitd py-3">
                <strong>आमांत तिथी:</strong>
                <span className="tithivalue">{data.length > 0 ? data[0].Amant_tithi : ""}</span>
              </td>
              <td className="tithitd py-3">
                <strong>नक्षत्र:</strong>
                <span className="tithivalue">{data.length > 0 ? data[0].Nakshatra : ""}</span>
              </td>
            </tr>
            <tr className="custom-border">
              <td className="tithitd py-3">
                <strong>करण:</strong>
                <span className="tithivalue">{data.length > 0 ? data[0].karan : ""}</span>
              </td>
              <td className="tithitd py-3">
                <strong>दिनविशेष:</strong>
                <span className="tithivalue">{data.length > 0 ? data[0].karan : ""}</span>
              </td>
              <td className="tithitd py-3">
                <strong>योग:</strong>
                <span className="tithivalue">{data.length > 0 ? data[0].Yog : ""}</span>
              </td>
            </tr>
            {/* <tr className="custom-border">
      <td colSpan="3" className="py-3 text-center">दिनविशेष</td>
    </tr> */}
          </tbody>
        </table>

        {/* </div> */}


        {/* ind ved greg time section  */}

        <div className='d-flex justify-content-between qrindved w-[calc(100%-2%)] m-auto mb-10' >
          <table className="table indvedgreg table-bordered table-striped table-hover max-h-[120px] m-auto">
            <tbody>
              <tr style={{ maxHeight: '30px' }}>
                <th className='bg-dark text-white py-1'>Indian Date</th>
                <td>{data.length > 0 ? data[0].Indian_date : ""}</td>
              </tr>
              <tr style={{ maxHeight: '30px' }}>
                <th className='bg-dark text-white py-1'>Vedic Date</th>
                <td>{data.length > 0 ? data[0].Vedic_date : ""}</td>
              </tr>
              <tr style={{ maxHeight: '30px' }}>
                <th className='bg-dark text-white py-1'>Greg. Date</th>
                <td>{commaSeparatedDate}</td>
              </tr>
            </tbody>
          </table>


          <div className='h-[190px] mb-4'>
            <img src={qrcode} alt="Kalayan Clock" className="object-cover h-full w-full" />
          </div>
        </div>



        {/* Notification */}
        <div className='container-fluid notification  border border-success  bg-success'>

          {error && <p style={{ color: 'red' }}>Error: {error}</p>}
          <p className='text-white w-full text-center'>{notifications?.[0]?.Marathi_text}</p>
        </div>

        <div className='container-fluid adv mt-1 border border-dark w-full'>
          <img src={adver} alt='error' className='object-cover w-full' />
          {/* {advertisements.map((ad) => (
             <div key={ad.id} className="advertisement-item">
               <h3>Happy Holi</h3>
               <img
                 src={`http://192.168.0.119:4000/uploads/${ad.adv_file}`} // Adjust the path based on your setup
                 alt={ad.info}
                 style={{ width: '200px', height: '200px' }} // You can adjust the styles as needed
               />
               <p>Created At: {new Date(ad.created_at).toLocaleString()}</p>
             </div>
           ))} */}
        </div>
      </div>
    </>
  );
};
// C:\Users\Acer\Downloads\kalayan28\backend\uploads\mediaFile-1730725252308.jpeg
export default Clock;

