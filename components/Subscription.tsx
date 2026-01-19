import React from 'react';
import { Check, ShieldCheck, CreditCard, RefreshCw, Star, Zap } from 'lucide-react';
import { FONTS } from '../constants/fonts';

const Subscription: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '0',
      period: 'forever',
      description: 'Perfect for getting started with AI-powered learning',
      features: [
        '5 AI-generated tests per month',
        'Basic chatbot support',
        'Upload up to 10 files',
        'Weekly surprise tests',
        'Basic progress tracking'
      ],
      cta: 'Current Plan',
      current: true,
      highlight: false
    },
    {
      name: 'Pro',
      price: '499',
      originalPrice: '799',
      period: 'per month',
      description: 'Ideal for serious students who want unlimited practice',
      features: [
        'Unlimited AI-generated tests',
        'Advanced AI chatbot with subject expertise',
        'Upload unlimited files',
        'Daily surprise tests',
        'Detailed performance analytics',
        'Project helper with AI guidance',
        'Priority support',
        'Export test results'
      ],
      cta: 'Upgrade to Pro',
      current: false,
      highlight: true,
      badge: 'Most Popular',
      save: 'Save ₹300'
    },
    {
      name: 'Max',
      price: '1499',
      originalPrice: '1899',
      period: 'per month',
      description: 'Complete learning solution with premium features',
      features: [
        'Everything in Pro',
        'Personalized study plans',
        'Advanced AI tutor (1-on-1 sessions)',
        'Custom question paper generation',
        'Collaborative study groups',
        'Offline mode support',
        'Advanced analytics & insights',
        'Priority customer support',
        'Early access to new features'
      ],
      cta: 'Upgrade to Max',
      current: false,
      highlight: false,
      save: 'Save ₹400'
    }
  ];

  const faqs = [
    { q: "Can I change my plan anytime?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle." },
    { q: "Is there a free trial?", a: "Our Free plan gives you access to core features. You can upgrade anytime to unlock premium features." },
    { q: "What payment methods do you accept?", a: "We accept all major credit cards, debit cards, UPI, and net banking for Indian users." },
    { q: "Do you offer refunds?", a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service." }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto pb-20" style={{ fontFamily: FONTS.PRIMARY, fontWeight: FONTS.WEIGHTS.LIGHT }}>
      {/* Header */}
      <div className="text-center mb-12 space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Choose Your Plan</h1>
        <p className="text-xl text-slate-500 dark:text-slate-400">Unlock your learning potential with Osmiq AI</p>
        <div className="inline-block bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-4 py-1.5 rounded-full text-sm font-semibold">
          Limited time offer-save up to 40%
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 relative items-start">
        {plans.map((plan, index) => (
          <div 
            key={plan.name}
            className={`
              group relative rounded-3xl p-8 transition-all duration-300 flex flex-col h-full overflow-hidden
              ${plan.highlight 
                ? 'bg-white dark:bg-slate-800 border-2 border-indigo-500 shadow-xl shadow-indigo-100 dark:shadow-none scale-105 z-10' 
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md'
              }
            `}
          >
            {/* Glare Effect Layers */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 rounded-3xl"
              style={{
                background: `radial-gradient(600px circle at center, rgba(255, 255, 255, 0.4), transparent 40%)`,
              }}
            />
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 rounded-3xl"
              style={{
                background: `linear-gradient(135deg, transparent 0%, rgba(99, 102, 241, 0.2) 45%, rgba(139, 92, 246, 0.2) 50%, rgba(99, 102, 241, 0.2) 55%, transparent 100%)`,
                transform: `rotate(45deg)`,
                width: '200%',
                height: '200%',
                left: '-50%',
                top: '-50%',
              }}
            />
            
            {/* Content wrapper with relative positioning */}
            <div className="relative z-10">
            {plan.badge && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-sm flex items-center gap-1 z-20">
                <Star size={14} fill="currentColor" /> {plan.badge}
              </div>
            )}

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 min-h-[40px]">{plan.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">₹{plan.price}</span>
                {plan.originalPrice && (
                  <span className="text-lg text-slate-400 line-through mb-1">₹{plan.originalPrice}</span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{plan.period}</p>
              {plan.save && (
                <span className="inline-block mt-2 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-md">
                  {plan.save}
                </span>
              )}
            </div>

            <div className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 p-0.5 rounded-full bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-300 leading-tight">{feature}</span>
                </div>
              ))}
            </div>

            <button
              className={`
                w-full py-3.5 rounded-xl font-bold transition-all text-sm relative z-10
                ${plan.current 
                  ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : plan.highlight
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                    : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100'
                }
              `}
            >
              {plan.cta}
            </button>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Badges */}
      <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 mb-20 border-t border-b border-slate-100 dark:border-slate-800 py-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-full">
            <RefreshCw size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">30-day money back</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">If you're not satisfied</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full">
            <ShieldCheck size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Secure payments</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">256-bit SSL encryption</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full">
            <CreditCard size={24} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">Cancel anytime</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">No hidden fees</p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;