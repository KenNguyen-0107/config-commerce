export const widgets = [
  {
    id: "grid-1",
    type: "Basic/Grid",
    parentId: "000000000-00000",
    generalFields: {
      extraLargeColumnCount: 2,
      extraLargeRowCount: 2,
      largeColumnCount: 2,
      mediumColumnCount: 2,
      smallColumnCount: 1,
      extraSmallColumnCount: 1,
      isFullWidth: false,
    },
    contextualFields: {},
  },
  {
    id: "card-1",
    parentId: "grid-1",
    type: "Promotion/Card",
    contextualFields: {
      background: "#283270",
      title: "THE EDIT",
      description:
        "Inspired by nature, curated by Jacksons. Explore our edit and take inspiration to make the most of your garden.",
      link: "/edit",
      size: "large",
      cta: "EXPLORE OUR FENCE PANEL RANGE",
    },
  },
  {
    id: "rows-1",
    parentId: "grid-1",
    type: "Basic/Rows",
    contextualFields: {},
    generalFields: {
      gap: "32px",
    },
  },
  {
    id: "card-2",
    parentId: "rows-1",
    type: "Promotion/Card",
    contextualFields: {
      title: "GARDEN TRENDS 2025",
      description: "We take a look at upcoming garden trends 2025",
      date: "25/10/2024 09:40 AM",
      image:
        "https://www.jacksons-fencing.co.uk/-/media/jacksons/images/blogs/gates-and-fencing-that-go-further/premium-fencing.jpg",
      link: "/trends",
      size: "small",
      cta: "EXPLORE OUR FENCE PANEL RANGE",
    },
  },
  {
    id: "card-3",
    parentId: "rows-1",
    type: "Promotion/Card",
    contextualFields: {
      title: "CELEBRATING YOUR FENCE: A MONTAGE OF MEMORABLE CUSTOMER STORIES",
      date: "25/10/2024 11:16 AM",
      image:
        "https://www.jacksons-fencing.co.uk/-/media/jacksons/images/blogs/gates-and-fencing-that-go-further/premium-fencing.jpg",
      link: "/stories",
      size: "small",
      cta: "EXPLORE OUR FENCE PANEL RANGE",
    },
  },
  {
    id: "rows-2",
    parentId: "grid-1",
    type: "Basic/Rows",
    contextualFields: {},
    generalFields: {
      gap: "32px",
    },
  },
  {
    id: "card-4",
    parentId: "rows-2",
    type: "Promotion/Card",
    contextualFields: {
      title: "DRIVEWAY FENCING IDEAS",
      date: "11/10/2024 12:00 AM",
      image:
        "https://www.jacksons-fencing.co.uk/-/media/jacksons/images/blogs/gates-and-fencing-that-go-further/premium-fencing.jpg",
      link: "/driveway",
      size: "large",
      cta: "EXPLORE OUR FENCE PANEL RANGE",
    },
  },
  {
    id: "card-5",
    parentId: "rows-2",
    type: "Promotion/Card",
    contextualFields: {
      background: "#283270",
      title: "JP LANDSCAPES",
      date: "09/10/2024 02:34 AM",
      link: "/landscapes",
      size: "small",
    },
  },
  {
    id: "card-6",
    parentId: "grid-1",
    type: "Promotion/Card",
    contextualFields: {
      title: "TYPES OF WHEELIE BIN STORAGE",
      date: "24/09/2024 11:00 AM",
      image:
        "https://www.jacksons-fencing.co.uk/-/media/jacksons/images/blogs/gates-and-fencing-that-go-further/premium-fencing.jpg",
      link: "/storage",
      size: "small",
      cta: "EXPLORE OUR FENCE PANEL RANGE",
    },
  },
  // data cho shopping with us
  {
    id: "SWU-grid-1",
    parentId: "SWU-grid-0",
    type: "ShoppingWithUs",
  },
  {
    id: "SWU-card-1",
    parentId: "SWU-grid-1",
    type: "CardInformation/Card",
    contextualFields: {
      imageSrc: "/images/3img.png",
      imageAlt: "imageAlt",
      title: "Trusted Quality",
      description:
        "Established since 1947, we're experts in premium quality fencing",
      ctaText: "Get Started",
    },
  },
  {
    id: "SWU-card-2",
    parentId: "SWU-grid-1",
    type: "CardInformation/Card",
    contextualFields: {
      imageSrc: "/images/3img.png",
      imageAlt: "imageAlt",
      title: "Guaranteed",
      description: "Calculate the components",
      ctaText: "Get Started",
    },
  },
  {
    id: "SWU-card-3",
    parentId: "SWU-grid-1",
    type: "CardInformation/Card",
    contextualFields: {
      imageSrc: "/images/3img.png",
      imageAlt: "imageAlt",
      title: "Apps & Online planning tools",
      description:
        "Use our online tools to plan and price your Fencing, Gate or Decking project. Use our online tools to plan and price your Fencing, Gate or Decking project.",
      ctaText: "Get Started",
    },
  },
  // data cho app and online
  {
    id: "63cc512c-d04c-4811-b6f6-829c5594367c",
    parentId: "grid-1111111111111111111111111",
    type: "Basic/Rows",
    contextualFields: {},
    generalFields: {
      gap: "32px",
    },
  },
  {
    parentId: "63cc512c-d04c-4811-b6f6-829c5594367c",
    type: "Basic/Slideshow",
    zone: "Content10",
    isLayout: false,
    id: "12f85571-6849-4efb-8f28-879fa2e5d805",
    generalFields: {
      height: "1/4 viewport",
      textAlignment: "center",
      showArrows: true,
      slideIndicator: true,
      autoplay: 10,
      responsiveFontSizes: true,
      customFontSizes: false,
      normalFontSize: null,
      h1FontSize: 40,
      h2FontSize: 32,
      h3FontSize: null,
      h4FontSize: null,
      h5FontSize: null,
      h6FontSize: null,
      customCSS:
        ".slideshow-wrapper {\n}\n\n.slideshow-carousel {\n}\n\n.slideshow-slide-container {\n}\n\n.slide-wrapper {\n}\n\n.slide-heading {\n}\n\n.slide-subheading {\n}\n\n.slide-button {\n}\n\n.slide-indicator {\n}\n\n.slide-dot-button {\n}\n\n.slide-arrow-wrapper {\n}\n\n.slide-arrow {\n}\n",
    },
    translatableFields: {},
    contextualFields: {
      slides: [
        {
          fields: {
            slideTitle: "Chilham Panels",
            background: "image",
            image:
              "https://www.jacksons-fencing.co.uk/-/media/jacksons/images/homepage/homepage-images-ui012/acoustic-fencing-jacksons.jpg?h=200\u0026iar=0\u0026mh=200\u0026mw=300\u0026w=267\u0026hash=6307A6270CBECDC2225C018238409106\u0026width=267\u0026height=200",
            imageOverlay: "",
            partialOverlay: false,
            partialOverlayPositioning: "bottom",
            responsiveImageBehavior: "cover",
            backgroundColor: "#C2A859",
            focalPoint: "center",
            heading: "\u003ch2\u003eFence Builder\n\u003c/h2\u003e",
            subheading: "",
            buttonLabel: "Get Started",
            buttonLink: {
              type: "Page",
              value: "",
            },
            buttonVariant: "primary",
            contentPadding: 50,
            centerTextVertically: false,
          },
        },
        {
          fields: {
            slideTitle: "Decking",
            background: "color",
            image:
              "https://www.jacksons-fencing.co.uk/-/media/jacksons/images/homepage/homepage-images-ui012/acoustic-fencing-jacksons.jpg?h=200\u0026iar=0\u0026mh=200\u0026mw=300\u0026w=267\u0026hash=6307A6270CBECDC2225C018238409106\u0026width=267\u0026height=200",
            imageOverlay: "",
            partialOverlay: false,
            partialOverlayPositioning: "bottom",
            responsiveImageBehavior: "cover",
            backgroundColor: "#A17171",
            focalPoint: "center",
            heading: "\u003ch2\u003eDecking\u003c/h2\u003e",
            subheading: "",
            buttonLabel: "",
            buttonLink: { type: "Page", value: "" },
            buttonVariant: "primary",
            contentPadding: 50,
            centerTextVertically: false,
          },
        },
        {
          fields: {
            slideTitle: "Pergolas",
            background: "color",
            image:
              "https://www.jacksons-fencing.co.uk/-/media/jacksons/images/homepage/homepage-images-ui012/acoustic-fencing-jacksons.jpg?h=200\u0026iar=0\u0026mh=200\u0026mw=300\u0026w=267\u0026hash=6307A6270CBECDC2225C018238409106\u0026width=267\u0026height=200",
            imageOverlay: "",
            partialOverlay: false,
            partialOverlayPositioning: "bottom",
            responsiveImageBehavior: "cover",
            backgroundColor: "#A17171",
            focalPoint: "center",
            heading: "\u003ch2\u003ePergolas\u003c/h2\u003e",
            subheading: "",
            buttonLabel: "",
            buttonLink: { type: "Page", value: "" },
            buttonVariant: "primary",
            contentPadding: 50,
            centerTextVertically: false,
          },
        },
      ],
    },
  },
];
