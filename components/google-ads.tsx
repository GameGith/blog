"use client";

import { useEffect } from "react";

// Display Ad - Responsive (untuk homepage banner, dll)
export function GoogleAds() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="my-6 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7845294761182815"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

// In-Article Ad (untuk di tengah artikel)
export function GoogleAdsInArticle() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="my-8 flex justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client="ca-pub-7845294761182815"
        data-ad-layout="in-article"
        data-ad-format="fluid"
      ></ins>
    </div>
  );
}

// Multiplex Ad (related articles style)
export function GoogleAdsMultiplex() {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  return (
    <div className="my-8">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7845294761182815"
        data-ad-format="autorelaxed"
      ></ins>
    </div>
  );
}
