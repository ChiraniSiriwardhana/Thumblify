import type { IPricing } from "../types";

export const pricingData: IPricing[] = [
    {
        name: "Free",
        price: 0,
        period: "month",
        features: [
            "5 AI Thumbnails per month",
            "Basic Templates",
            "Standard Resolution",
            "No watermark",
            "Email Support"
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 24,
        period: "month",
        features: [
            "Unlimited AI Thumbnails",
            "Premium Templates",
            "4K Resolution",
            "Priority Support",
            "A/B Testing",
            "Custom Fonts",
            "Brand Kit Analysis",
        ],
        mostPopular: true
    },
        {
        name: "Enterprise",
        price: 34,
        period: "month",
        features: [
           "Everything in Pro",
           "API Access",
           "Team Collaboration",
           "Custom Branding",
           "Dedicated Account Manager"
        ],
        mostPopular: false
    }
];