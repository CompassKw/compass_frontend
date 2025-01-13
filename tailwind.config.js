module.exports = {
  theme: {
    screens: {
      lab: { min: "1200px" },
      smart: { max: "1199px" },
      minsmart: { max: "991.9px" },
      tab: { min: "992px", max: "1199px" },
      mintab: { min: "768px", max: "991px" },
      md: { min: "992px" },
      mob: { max: "767px" },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
      },
    },
    fontFamily: {
      Jost: ["'Jost'", "sans-serif"],
    },
    extend: {
      colors: {
        first: "#051036",
        secondary: "#2262AD",
        third: "#F78248",
        fourth: "#697488",
      },
      boxShadow: {
        crad: "0px 4px 7.9px 0px #00000014",
        logo: "0px 0px 9.9px 7px #FFFFFF",
        btn: "0px 8px 20px 0px #FFDA3280",
        img: "0px 4px 4px 0px #00000040",
      },
      backgroundImage: {
        downloadbannar:
          "linear-gradient(103.57deg,rgba(255, 255, 255, 0.7) -1.03%,rgba(22, 53, 96, 0.7) 100%),url('/assets/images/downloadBannar.png')",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  plugins: [],
};
