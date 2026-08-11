"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Car,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Gem,
  GraduationCap,
  HandHeart,
  Heart,
  HelpCircle,
  Home,
  Info,
  Lightbulb,
  LockKeyhole,
  PartyPopper,
  PawPrint,
  PiggyBank,
  Plus,
  RotateCcw,
  Share2,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Trash2,
  TrendingUp,
  Utensils,
  WalletCards,
  X,
  Zap,
} from "lucide-react";
import { arc as d3Arc, easeCubicOut, interpolate, pie, select } from "d3";
import {
  calculateHECS as calcHelp,
  calculateMedicare as calcMedicare,
  calculateTaxATO as calcTax,
  grossFromNet,
  grossFromNetSimple as grossSimple,
  SUPER_RATE,
  TAX_YEAR,
} from "@/lib/tax";
import styles from "./DreamLifeCalculator.module.css";

const COLOURS = {
  blue: "#0068D8",
  purple: "#7A3CFF",
  mint: "#08D8B8",
  yellow: "#F8D018",
  pink: "#F84878",
  orange: "#FF6B2C",
};

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const formatInputNumber = (value) => {
  const number = Number.parseFloat(value);
  if (Number.isNaN(number) || value === "" || value === 0) return "";
  return new Intl.NumberFormat("en-AU", { maximumFractionDigits: 2 }).format(number);
};

const FREQUENCIES = [
  { value: "weekly", label: "Weekly", multiplier: 52 },
  { value: "fortnightly", label: "Fortnightly", multiplier: 26 },
  { value: "monthly", label: "Monthly", multiplier: 12 },
  { value: "quarterly", label: "Quarterly", multiplier: 4 },
  { value: "yearly", label: "Yearly", multiplier: 1 },
];

const DISPLAY_FREQUENCIES = [
  { value: "weekly", label: "Weekly", divisor: 52 },
  { value: "monthly", label: "Monthly", divisor: 12 },
  { value: "yearly", label: "Yearly", divisor: 1 },
];

const frequencyToYear = (amount, frequency) =>
  (Number.parseFloat(amount) || 0) *
  (FREQUENCIES.find((option) => option.value === frequency)?.multiplier || 1);

const yearToDisplay = (yearly, frequency) =>
  yearly / (DISPLAY_FREQUENCIES.find((option) => option.value === frequency)?.divisor || 1);

const frequencyShort = (frequency) =>
  frequency === "weekly" ? "wk" : frequency === "monthly" ? "mo" : "yr";

let itemSequence = 0;
const nextItemId = () => `item-${++itemSequence}`;

const CATEGORY_DEFINITIONS = [
  {
    id: "housing",
    icon: "Home",
    label: "Housing",
    color: COLOURS.purple,
    prompts: [
      "Will you rent or buy, and in which suburb?",
      "Include contents or home insurance.",
      "Budget for maintenance, repairs or body corporate.",
      "Remember water, rates and utilities.",
    ],
    defaults: [
      { name: "Rent / mortgage", amount: 500, frequency: "weekly" },
      { name: "Contents insurance", amount: 30, frequency: "monthly" },
    ],
  },
  {
    id: "transport",
    icon: "Car",
    label: "Transport",
    color: COLOURS.blue,
    prompts: [
      "Include repayments, registration, insurance and servicing.",
      "Fuel might be $60–100 each week.",
      "Could public transport, cycling or rideshare replace a car?",
      "Remember tolls, parking and roadside assistance.",
    ],
    defaults: [
      { name: "Car repayment", amount: 400, frequency: "monthly" },
      { name: "Fuel", amount: 60, frequency: "weekly" },
      { name: "Registration and insurance", amount: 1_800, frequency: "yearly" },
    ],
  },
  {
    id: "food",
    icon: "Utensils",
    label: "Food & drink",
    color: COLOURS.mint,
    prompts: [
      "Groceries might be $80–150 each week.",
      "What does eating out realistically look like?",
      "A daily barista coffee can exceed $1,300 each year.",
      "Remember delivery, alcohol, snacks and meal kits.",
    ],
    defaults: [
      { name: "Groceries", amount: 120, frequency: "weekly" },
      { name: "Eating out", amount: 60, frequency: "weekly" },
      { name: "Coffee", amount: 25, frequency: "weekly" },
    ],
  },
  {
    id: "health",
    icon: "Heart",
    label: "Health & fitness",
    color: COLOURS.pink,
    prompts: [
      "Will you pay for private health insurance?",
      "What kind of gym or sport membership suits you?",
      "Include dental, optical and physio costs.",
      "Remember mental health and regular prescriptions.",
    ],
    defaults: [
      { name: "Health insurance", amount: 120, frequency: "monthly" },
      { name: "Gym membership", amount: 30, frequency: "weekly" },
    ],
  },
  {
    id: "tech",
    icon: "Smartphone",
    label: "Tech & subscriptions",
    color: COLOURS.blue,
    prompts: [
      "Include your phone plan and internet.",
      "List streaming, music, gaming and software subscriptions.",
      "Do you replace your devices regularly?",
      "Check for subscriptions you would not actually keep.",
    ],
    defaults: [
      { name: "Phone plan", amount: 50, frequency: "monthly" },
      { name: "Internet", amount: 80, frequency: "monthly" },
      { name: "Streaming", amount: 40, frequency: "monthly" },
    ],
  },
  {
    id: "personal",
    icon: "ShoppingBag",
    label: "Personal & appearance",
    color: COLOURS.purple,
    prompts: [
      "How often do you buy clothing?",
      "Include haircuts, skincare and grooming.",
      "Would quality purchases replace frequent cheap ones?",
      "Remember laundry and dry cleaning.",
    ],
    defaults: [
      { name: "Clothing", amount: 150, frequency: "monthly" },
      { name: "Haircuts", amount: 50, frequency: "monthly" },
    ],
  },
  {
    id: "education",
    icon: "GraduationCap",
    label: "Education & growth",
    color: COLOURS.yellow,
    prompts: [
      "Include courses, certifications and workshops.",
      "Remember books and learning subscriptions.",
      "Would coaching or mentoring matter to you?",
      "Include professional memberships.",
    ],
    defaults: [{ name: "Books and courses", amount: 50, frequency: "monthly" }],
  },
  {
    id: "social",
    icon: "PartyPopper",
    label: "Social & fun",
    color: COLOURS.pink,
    prompts: [
      "Include events, festivals, concerts and drinks.",
      "What do your hobbies cost?",
      "Remember date nights and activities.",
      "Add realistic holidays and weekend trips.",
    ],
    defaults: [
      { name: "Going out and social", amount: 80, frequency: "weekly" },
      { name: "Holidays and travel", amount: 5_000, frequency: "yearly" },
    ],
  },
  {
    id: "toys",
    icon: "Gem",
    label: "Toys & big wants",
    color: COLOURS.orange,
    prompts: [
      "Motorbike, boat, camera, gaming rig or something else?",
      "Enter a total price and a realistic payoff period.",
      "Include fuel, insurance, maintenance or storage.",
      "Would renting or sharing make more sense?",
    ],
    defaults: [],
  },
  {
    id: "pets",
    icon: "PawPrint",
    label: "Pets",
    color: COLOURS.yellow,
    prompts: [
      "Include food, vet costs and registration.",
      "Would you pay for pet insurance?",
      "Remember grooming, boarding and training.",
      "Could your housing choice support the pet you want?",
    ],
    defaults: [],
  },
  {
    id: "giving",
    icon: "HandHeart",
    label: "Giving & gifts",
    color: COLOURS.blue,
    prompts: [
      "Include birthdays and Christmas.",
      "Would you regularly support a charity or cause?",
      "Remember weddings and major celebrations.",
      "Do you want capacity to help family or friends?",
    ],
    defaults: [{ name: "Gifts", amount: 1_200, frequency: "yearly" }],
  },
  {
    id: "savings",
    icon: "PiggyBank",
    label: "Savings & investing",
    color: COLOURS.mint,
    prompts: [
      "Build an emergency fund before treating savings as optional.",
      "Include investing, super top-ups or other long-term goals.",
      "Are you saving for a home deposit?",
      "Pay your future self first, not last.",
    ],
    defaults: [
      { name: "Savings", amount: 200, frequency: "monthly" },
      { name: "Investing", amount: 100, frequency: "monthly" },
    ],
  },
  {
    id: "bills",
    icon: "Zap",
    label: "Bills & admin",
    color: COLOURS.orange,
    prompts: [
      "Include electricity, gas and water.",
      "Remember accounting or tax-return fees.",
      "Add council rates or strata if they apply.",
      "Leave room for the boring costs that still happen.",
    ],
    defaults: [
      { name: "Electricity", amount: 350, frequency: "quarterly" },
      { name: "Gas", amount: 200, frequency: "quarterly" },
    ],
  },
];

const ICONS = {
  Car,
  Gem,
  GraduationCap,
  HandHeart,
  Heart,
  Home,
  PartyPopper,
  PawPrint,
  PiggyBank,
  ShoppingBag,
  Smartphone,
  Utensils,
  Zap,
};

const STORAGE_KEY = "dreamlife_v2";

const saveState = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const buildDefaults = () =>
  CATEGORY_DEFINITIONS.map((category) => ({
    ...category,
    expanded: category.id === "housing",
    items: category.defaults.map((item) => ({
      id: nextItemId(),
      name: item.name,
      amount: item.amount,
      freq: item.frequency,
      isBigTicket: false,
      totalPrice: 0,
      years: 5,
    })),
  }));

const normaliseSavedCategories = (savedCategories) =>
  savedCategories.map((savedCategory) => {
    const canonical = CATEGORY_DEFINITIONS.find((category) => category.id === savedCategory.id);
    if (!canonical) return savedCategory;
    return {
      ...savedCategory,
      icon: canonical.icon,
      color: canonical.color,
      prompts: canonical.prompts,
    };
  });

function useAnimatedNumber(target, duration = 420) {
  const [display, setDisplay] = useState(target);
  const previous = useRef(target);
  const frame = useRef(null);

  useEffect(() => {
    const from = previous.current;
    const to = target;
    if (from === to) return undefined;

    const started = performance.now();
    const step = (now) => {
      const progress = Math.min((now - started) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(from + (to - from) * eased);
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    previous.current = to;
    return () => frame.current && cancelAnimationFrame(frame.current);
  }, [duration, target]);

  return display;
}

function AnimatedCurrency({ value, className = "", suffix = "" }) {
  const animated = useAnimatedNumber(value);
  return (
    <span className={className}>
      {formatCurrency(Math.round(animated))}
      {suffix ? <small>{suffix}</small> : null}
    </span>
  );
}

function SegmentedControl({ options, value, onChange, label }) {
  return (
    <div className={styles.segmentGroup} aria-label={label} role="group">
      {options.map((option) => (
        <button
          className={`${styles.segmentButton} ${value === option.value ? styles.segmentButtonActive : ""}`}
          key={option.value}
          onClick={() => onChange(option.value)}
          type="button"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

function Tip({ prompts, color }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, above: true });
  const buttonRef = useRef(null);
  const popoverRef = useRef(null);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const above = rect.top > 340;
    setPosition({
      top: above ? rect.top - 10 : rect.bottom + 10,
      left: Math.max(170, Math.min(rect.left + rect.width / 2, window.innerWidth - 170)),
      above,
    });
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    updatePosition();

    const closeFromOutside = (event) => {
      if (!buttonRef.current?.contains(event.target) && !popoverRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };
    const closeFromEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, [open, updatePosition]);

  return (
    <>
      <button
        ref={buttonRef}
        className={styles.tipButton}
        type="button"
        aria-label="Show ideas for this category"
        aria-expanded={open}
        onClick={(event) => {
          event.stopPropagation();
          updatePosition();
          setOpen((current) => !current);
        }}
      >
        <Lightbulb size={14} />
      </button>
      {open ? (
        <div
          ref={popoverRef}
          className={styles.tipPopover}
          role="dialog"
          style={{
            top: position.top,
            left: position.left,
            transform: position.above ? "translate(-50%, -100%)" : "translate(-50%, 0)",
            "--tip-color": color,
          }}
        >
          <strong>Things to think about</strong>
          {prompts.map((prompt) => (
            <p key={prompt}>{prompt}</p>
          ))}
        </div>
      ) : null}
    </>
  );
}

function CurrencyInput({ value, onChange, placeholder = "0", ariaLabel }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      className={styles.input}
      type="text"
      inputMode="decimal"
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={focused ? (value === "" || value === 0 ? "" : value) : formatInputNumber(value)}
      onChange={(event) => {
        const raw = event.target.value.replace(/[^0-9.]/g, "");
        onChange(raw === "" ? "" : Number.parseFloat(raw));
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function TextInput({ value, onChange, placeholder, ariaLabel }) {
  return (
    <input
      className={styles.input}
      type="text"
      aria-label={ariaLabel}
      placeholder={placeholder}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

function StatBox({ label, value, note, color }) {
  return (
    <div className={styles.statBox} style={{ "--stat-colour": color }}>
      <span className={styles.microLabel}>{label}</span>
      <strong>{value}</strong>
      {note ? <small>{note}</small> : null}
    </div>
  );
}

function DonutChart({ data, size = 220 }) {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;
    const svg = select(svgRef.current);
    svg.selectAll("*").remove();

    const radius = size / 2;
    const group = svg
      .attr("width", size)
      .attr("height", size)
      .append("g")
      .attr("transform", `translate(${radius},${radius})`);
    const pieGenerator = pie().value((item) => item.value).sort(null).padAngle(0.035);
    const arc = d3Arc().innerRadius(radius * 0.6).outerRadius(radius * 0.88).cornerRadius(5);
    const hoverArc = d3Arc().innerRadius(radius * 0.57).outerRadius(radius * 0.93).cornerRadius(5);
    const paths = group
      .selectAll("path")
      .data(pieGenerator(data))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", (item) => item.data.color)
      .attr("stroke", "#111411")
      .attr("stroke-width", 2)
      .attr("opacity", 0);

    paths
      .transition()
      .duration(650)
      .delay((item, index) => index * 55)
      .ease(easeCubicOut)
      .attrTween("d", (item) => {
        const tween = interpolate(
          { startAngle: item.startAngle, endAngle: item.startAngle },
          item,
        );
        return (progress) => arc(tween(progress));
      })
      .attr("opacity", 1);

    paths
      .style("cursor", "pointer")
      .on("mouseenter", function handleEnter(event, item) {
        select(this).transition().duration(150).attr("d", hoverArc);
        setHovered(item.data);
      })
      .on("mouseleave", function handleLeave() {
        select(this).transition().duration(150).attr("d", arc);
        setHovered(null);
      });
  }, [data, size]);

  return (
    <div className={styles.donutWrap}>
      <svg ref={svgRef} aria-label="Spending breakdown chart" role="img" />
      <div
        className={styles.donutCenter}
        style={{ "--donut-colour": hovered?.color || COLOURS.purple }}
      >
        <small>{hovered?.label || "Active categories"}</small>
        <strong>{hovered ? `${hovered.percent}%` : data.length}</strong>
      </div>
    </div>
  );
}

function EmptyState({ color, onAdd, onAddBig }) {
  return (
    <div className={styles.emptyState} style={{ "--cat-color": color }}>
      <span className={styles.emptyIcon}>
        <Sparkles size={21} />
      </span>
      <p>Nothing here yet. Add only what belongs in the life you actually want.</p>
      <div className={styles.itemActions}>
        <button className={`${styles.addButton} ${styles.addButtonPrimary}`} onClick={onAdd} type="button">
          <Plus size={15} /> Add item
        </button>
        <button className={styles.addButton} onClick={onAddBig} type="button">
          <Gem size={15} /> Big purchase
        </button>
      </div>
    </div>
  );
}

export default function DreamLifeCalculatorClient() {
  const [categories, setCategories] = useState(buildDefaults);
  const [displayFrequency, setDisplayFrequency] = useState("weekly");
  const [taxMode, setTaxMode] = useState("ato");
  const [simpleRate, setSimpleRate] = useState(30);
  const [includeHelp, setIncludeHelp] = useState(false);
  const [includeSuper, setIncludeSuper] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [shareNotice, setShareNotice] = useState("");
  const [removingItems, setRemovingItems] = useState(new Set());
  const [newItems, setNewItems] = useState(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = loadState();
    if (!saved) return;
    if (saved.categories) setCategories(normaliseSavedCategories(saved.categories));
    if (saved.displayFreq) setDisplayFrequency(saved.displayFreq);
    if (saved.taxMode) setTaxMode(saved.taxMode);
    if (saved.simpleRate != null) setSimpleRate(saved.simpleRate);
    if (saved.includeHECS != null) setIncludeHelp(saved.includeHECS);
    if (saved.includeSuper != null) setIncludeSuper(saved.includeSuper);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveState({
      categories,
      displayFreq: displayFrequency,
      taxMode,
      simpleRate,
      includeHECS: includeHelp,
      includeSuper,
    });
  }, [categories, displayFrequency, includeHelp, includeSuper, mounted, simpleRate, taxMode]);

  useEffect(() => {
    if (!showShare && !showHelp) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setShowShare(false);
        setShowHelp(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [showHelp, showShare]);

  const totals = useMemo(() => {
    const byCategory = {};
    let grandYearly = 0;

    categories.forEach((category) => {
      let categoryYearly = 0;
      category.items.forEach((item) => {
        if (item.isBigTicket && item.totalPrice > 0 && item.years > 0) {
          categoryYearly += item.totalPrice / item.years;
        } else {
          categoryYearly += frequencyToYear(item.amount, item.freq);
        }
      });
      byCategory[category.id] = categoryYearly;
      grandYearly += categoryYearly;
    });

    return { byCategory, grandYearly };
  }, [categories]);

  const income = useMemo(() => {
    const net = totals.grandYearly;
    if (taxMode === "ato") {
      const gross = grossFromNet(net, includeHelp);
      const tax = calcTax(gross);
      const medicare = calcMedicare(gross);
      const help = includeHelp ? calcHelp(gross) : 0;
      const packageValue = includeSuper ? Math.round(gross * (1 + SUPER_RATE)) : gross;
      return { gross, tax, medicare, help, packageValue };
    }

    const gross = grossSimple(net, simpleRate);
    const packageValue = includeSuper ? Math.round(gross * (1 + SUPER_RATE)) : gross;
    return { gross, tax: gross - net, medicare: 0, help: 0, packageValue };
  }, [includeHelp, includeSuper, simpleRate, taxMode, totals.grandYearly]);

  const displayedLifeCost = yearToDisplay(totals.grandYearly, displayFrequency);
  const displayedIncomeTarget = yearToDisplay(
    includeSuper ? income.packageValue : income.gross,
    displayFrequency,
  );
  const itemCount = categories.reduce((sum, category) => sum + category.items.length, 0);

  const sortedCategories = useMemo(
    () =>
      categories
        .filter((category) => (totals.byCategory[category.id] || 0) > 0)
        .sort(
          (first, second) =>
            (totals.byCategory[second.id] || 0) - (totals.byCategory[first.id] || 0),
        ),
    [categories, totals.byCategory],
  );

  const donutData = useMemo(
    () =>
      sortedCategories.slice(0, 8).map((category) => ({
        label: category.label,
        value: totals.byCategory[category.id] || 0,
        color: category.color,
        percent:
          totals.grandYearly > 0
            ? (((totals.byCategory[category.id] || 0) / totals.grandYearly) * 100).toFixed(1)
            : "0",
      })),
    [sortedCategories, totals.byCategory, totals.grandYearly],
  );

  const toggleCategory = (categoryId) =>
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId ? { ...category, expanded: !category.expanded } : category,
      ),
    );

  const addItem = (categoryId, bigPurchase = false) => {
    const itemId = nextItemId();
    setNewItems((current) => new Set(current).add(itemId));
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              expanded: true,
              items: [
                ...category.items,
                {
                  id: itemId,
                  name: "",
                  amount: 0,
                  freq: "weekly",
                  isBigTicket: bigPurchase,
                  totalPrice: 0,
                  years: 5,
                },
              ],
            }
          : category,
      ),
    );
    window.setTimeout(() => {
      setNewItems((current) => {
        const next = new Set(current);
        next.delete(itemId);
        return next;
      });
    }, 450);
  };

  const removeItem = (categoryId, itemId) => {
    setRemovingItems((current) => new Set(current).add(itemId));
    window.setTimeout(() => {
      setCategories((current) =>
        current.map((category) =>
          category.id === categoryId
            ? { ...category, items: category.items.filter((item) => item.id !== itemId) }
            : category,
        ),
      );
      setRemovingItems((current) => {
        const next = new Set(current);
        next.delete(itemId);
        return next;
      });
    }, 280);
  };

  const updateItem = (categoryId, itemId, field, value) =>
    setCategories((current) =>
      current.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              items: category.items.map((item) =>
                item.id === itemId ? { ...item, [field]: value } : item,
              ),
            }
          : category,
      ),
    );

  const addCustomCategory = () => {
    const categoryId = `custom-${Date.now()}`;
    setCategories((current) => [
      ...current,
      {
        id: categoryId,
        icon: "Gem",
        label: "Custom category",
        color: COLOURS.purple,
        prompts: ["What else belongs in the life you want to design?"],
        expanded: true,
        items: [
          {
            id: nextItemId(),
            name: "",
            amount: 0,
            freq: "weekly",
            isBigTicket: false,
            totalPrice: 0,
            years: 5,
          },
        ],
      },
    ]);
  };

  const removeCategory = (categoryId) =>
    setCategories((current) => current.filter((category) => category.id !== categoryId));

  const renameCategory = (categoryId, label) =>
    setCategories((current) =>
      current.map((category) => (category.id === categoryId ? { ...category, label } : category)),
    );

  const resetAll = () => {
    if (!window.confirm("Reset every category and setting to the starter values?")) return;
    setCategories(buildDefaults());
    setDisplayFrequency("weekly");
    setTaxMode("ato");
    setSimpleRate(30);
    setIncludeHelp(false);
    setIncludeSuper(false);
  };

  const shareSummary = async () => {
    const summary = `My dream life estimate: ${formatCurrency(displayedLifeCost)}/${frequencyShort(
      displayFrequency,
    )}. Estimated gross income target: ${formatCurrency(income.gross)}/year.`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "My Dream Life", text: summary });
        setShareNotice("Shared");
      } else {
        await navigator.clipboard.writeText(summary);
        setShareNotice("Copied");
      }
    } catch {
      setShareNotice("Ready to screenshot");
    }
    window.setTimeout(() => setShareNotice(""), 1800);
  };

  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#dream-planner">
        Skip to planner
      </a>

      <header className={styles.toolbar}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>MB.</span>
          <span className={styles.brandCopy}>
            <strong>Dream Life Calculator</strong>
            <small>MB-01 // Lifestyle module</small>
          </span>
        </Link>

        <div className={styles.toolbarActions}>
          <button className={styles.iconButton} onClick={resetAll} type="button" aria-label="Reset calculator">
            <RotateCcw size={17} />
          </button>
          <button className={styles.iconButton} onClick={() => setShowHelp(true)} type="button" aria-label="How this calculator works">
            <HelpCircle size={19} />
          </button>
          <button className={styles.shareButton} onClick={() => setShowShare(true)} type="button">
            <Share2 size={16} /> Share
          </button>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Dream Life module ready</p>
            <h1>
              Design your life.
              <span>Know the cost.</span>
            </h1>
            <p className={styles.heroLead}>
              Most people pick a career first and hope the lifestyle works out. Flip it. Build the life you
              want, price it honestly, then see the income that could support it.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#dream-planner">
                Build my life number <TrendingUp size={16} />
              </a>
              <button className={styles.secondaryButton} onClick={() => setShowHelp(true)} type="button">
                How it works
              </button>
            </div>
            <div className={styles.heroTrust}>
              <span className={styles.trustChip}><CheckCircle2 size={13} /> {TAX_YEAR} settings</span>
              <span className={styles.trustChip}><LockKeyhole size={13} /> Saved on this device</span>
              <span className={styles.trustChip}><Sparkles size={13} /> Free planning tool</span>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.consoleFrame}>
              <div className={styles.consoleFrameTop}>
                <span>MB-01 // Dream Life</span>
                <span>Module loaded</span>
              </div>
              <Image
                className={styles.consoleImage}
                src="/assets/console/mb01-console-dream-life-loaded-v1.webp"
                alt="Dream Life Calculator cartridge loaded into the MB-01 Life Console"
                width={1280}
                height={653}
                priority
                sizes="(max-width: 900px) 94vw, 56vw"
              />
            </div>
          </div>
        </section>

        <section className={styles.workspace} id="dream-planner" style={{ "--section-colour": COLOURS.purple }}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>01</span>
            <div>
              <p className={styles.sectionKicker}>Build the lifestyle</p>
              <h2 className={styles.sectionTitle}>What does your life cost?</h2>
            </div>
            <SegmentedControl
              label="Display costs as"
              options={DISPLAY_FREQUENCIES}
              value={displayFrequency}
              onChange={setDisplayFrequency}
            />
          </div>

          <div className={styles.workspaceGrid}>
            <div className={styles.categoryColumn}>
              <div className={styles.plannerNote}>
                <Lightbulb size={20} />
                <span>
                  Starter amounts are examples, not recommendations. Replace them with the life you actually
                  want—or remove anything that does not belong.
                </span>
              </div>

              {categories.map((category, categoryIndex) => {
                const Icon = ICONS[category.icon] || Gem;
                const categoryYearly = totals.byCategory[category.id] || 0;
                const isCustom = category.id.startsWith("custom-");

                return (
                  <article
                    className={`${styles.categoryCard} ${category.expanded ? styles.categoryCardOpen : ""}`}
                    key={category.id}
                    style={{ "--cat-color": category.color }}
                  >
                    <div
                      className={styles.categoryTrigger}
                      role="button"
                      tabIndex={0}
                      aria-expanded={category.expanded}
                      onClick={() => toggleCategory(category.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          toggleCategory(category.id);
                        }
                      }}
                    >
                      <span className={styles.categoryIcon} aria-hidden="true">
                        <Icon size={19} />
                      </span>
                      <span className={styles.categoryTitleRow}>
                        {isCustom ? (
                          <input
                            className={styles.customCategoryName}
                            value={category.label}
                            aria-label="Custom category name"
                            onClick={(event) => event.stopPropagation()}
                            onChange={(event) => renameCategory(category.id, event.target.value)}
                          />
                        ) : (
                          <span className={styles.categoryTitle}>
                            {String(categoryIndex + 1).padStart(2, "0")} · {category.label}
                          </span>
                        )}
                        <Tip prompts={category.prompts} color={category.color} />
                      </span>
                      <span className={styles.categoryTotal}>
                        {formatCurrency(yearToDisplay(categoryYearly, displayFrequency))}/
                        {frequencyShort(displayFrequency)}
                      </span>
                      {category.expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </div>

                    {category.expanded ? (
                      <div className={styles.categoryBody}>
                        {category.items.length === 0 ? (
                          <EmptyState
                            color={category.color}
                            onAdd={() => addItem(category.id)}
                            onAddBig={() => addItem(category.id, true)}
                          />
                        ) : (
                          <>
                            <div className={styles.itemList}>
                              {category.items.map((item) => (
                                <div
                                  className={`${styles.itemRow} ${
                                    newItems.has(item.id) ? styles.itemRowNew : ""
                                  } ${removingItems.has(item.id) ? styles.itemRowRemoving : ""}`}
                                  key={item.id}
                                >
                                  <label className={styles.field}>
                                    <span className={styles.fieldLabel}>Item</span>
                                    <TextInput
                                      value={item.name}
                                      onChange={(value) => updateItem(category.id, item.id, "name", value)}
                                      placeholder={item.isBigTicket ? "Big purchase name" : "Item name"}
                                      ariaLabel={`${category.label} item name`}
                                    />
                                  </label>

                                  <label className={styles.field}>
                                    <span className={styles.fieldLabel}>
                                      {item.isBigTicket ? "Total price" : "Amount"}
                                    </span>
                                    <span className={styles.currencyWrap}>
                                      <CurrencyInput
                                        value={item.isBigTicket ? item.totalPrice : item.amount}
                                        onChange={(value) =>
                                          updateItem(
                                            category.id,
                                            item.id,
                                            item.isBigTicket ? "totalPrice" : "amount",
                                            value,
                                          )
                                        }
                                        ariaLabel={`${item.name || category.label} amount`}
                                      />
                                    </span>
                                  </label>

                                  <label className={styles.field}>
                                    <span className={styles.fieldLabel}>
                                      {item.isBigTicket ? "Pay off over" : "Frequency"}
                                    </span>
                                    {item.isBigTicket ? (
                                      <CurrencyInput
                                        value={item.years}
                                        onChange={(value) => updateItem(category.id, item.id, "years", value || 0)}
                                        placeholder="Years"
                                        ariaLabel={`${item.name || category.label} payoff years`}
                                      />
                                    ) : (
                                      <select
                                        className={styles.select}
                                        value={item.freq}
                                        aria-label={`${item.name || category.label} frequency`}
                                        onChange={(event) =>
                                          updateItem(category.id, item.id, "freq", event.target.value)
                                        }
                                      >
                                        {FREQUENCIES.map((frequency) => (
                                          <option key={frequency.value} value={frequency.value}>
                                            {frequency.label}
                                          </option>
                                        ))}
                                      </select>
                                    )}
                                  </label>

                                  <button
                                    className={styles.removeButton}
                                    type="button"
                                    aria-label={`Remove ${item.name || "item"}`}
                                    onClick={() => removeItem(category.id, item.id)}
                                  >
                                    <Trash2 size={17} />
                                  </button>

                                  {item.isBigTicket && item.totalPrice > 0 && item.years > 0 ? (
                                    <p className={styles.bigPurchaseNote}>
                                      {formatCurrency(
                                        yearToDisplay(item.totalPrice / item.years, displayFrequency),
                                      )}
                                      /{frequencyShort(displayFrequency)} for {item.years} year
                                      {item.years === 1 ? "" : "s"}
                                    </p>
                                  ) : null}
                                </div>
                              ))}
                            </div>

                            <div className={styles.itemActions}>
                              <button
                                className={`${styles.addButton} ${styles.addButtonPrimary}`}
                                onClick={() => addItem(category.id)}
                                type="button"
                              >
                                <Plus size={15} /> Add item
                              </button>
                              <button
                                className={styles.addButton}
                                onClick={() => addItem(category.id, true)}
                                type="button"
                              >
                                <Gem size={15} /> Add big purchase
                              </button>
                            </div>
                          </>
                        )}

                        {isCustom ? (
                          <button
                            className={styles.quietButton}
                            onClick={() => removeCategory(category.id)}
                            type="button"
                          >
                            Remove this custom category
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                );
              })}

              <button
                className={`${styles.addButton} ${styles.customCategoryButton}`}
                onClick={addCustomCategory}
                type="button"
              >
                <Plus size={16} /> Add a custom category
              </button>
            </div>

            <aside className={styles.resultsRail} aria-live="polite">
              <section className={`${styles.resultCard} ${styles.lifeNumberCard}`}>
                <p className={styles.microLabel}>Your life number</p>
                <AnimatedCurrency
                  value={displayedLifeCost}
                  className={styles.bigNumber}
                  suffix={`/${frequencyShort(displayFrequency)}`}
                />
                <div className={styles.resultMeta}>
                  <span>{formatCurrency(totals.grandYearly)}/year</span>
                  <span>{itemCount} line items</span>
                </div>
              </section>

              <section className={`${styles.resultCard} ${styles.incomeTargetCard}`}>
                <p className={styles.microLabel}>Estimated income target</p>
                <h3>{includeSuper ? "Total package" : "Gross salary"}</h3>
                <AnimatedCurrency
                  value={includeSuper ? income.packageValue : income.gross}
                  className={styles.incomeTargetValue}
                />
                <p>
                  About {formatCurrency(displayedIncomeTarget)}/{frequencyShort(displayFrequency)} before tax
                  {includeSuper ? ", including super" : ""}.
                </p>
                <a className={styles.railLink} href="#income-model">
                  Inspect the estimate <ExternalLink size={13} />
                </a>
              </section>

              <div className={styles.saveStatus}>
                <CheckCircle2 size={16} /> Changes save automatically on this device
              </div>
            </aside>
          </div>
        </section>

        <section
          className={styles.incomeSection}
          id="income-model"
          style={{ "--section-colour": COLOURS.mint }}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionNumber}>02</span>
            <div>
              <p className={styles.sectionKicker}>Reverse engineer the money</p>
              <h2 className={styles.sectionTitle}>What might you need to earn?</h2>
            </div>
          </div>

          <div className={styles.incomePanel}>
            <p className={styles.incomeIntro}>
              Your selected lifestyle costs <strong>{formatCurrency(totals.grandYearly)} each year after tax</strong>.
              Adjust the model below to estimate the gross income that could fund it.
            </p>

            <div className={styles.controlRow}>
              <SegmentedControl
                label="Income estimate mode"
                options={[
                  { value: "ato", label: "Australian settings" },
                  { value: "simple", label: "Simple percentage" },
                ]}
                value={taxMode}
                onChange={setTaxMode}
              />
              <button
                className={`${styles.toggleButton} ${includeHelp ? styles.toggleButtonActive : ""}`}
                style={{ "--toggle-colour": COLOURS.purple }}
                onClick={() => setIncludeHelp((current) => !current)}
                type="button"
                aria-pressed={includeHelp}
              >
                <GraduationCap size={16} /> HELP debt {includeHelp ? "on" : "off"}
              </button>
              <button
                className={`${styles.toggleButton} ${includeSuper ? styles.toggleButtonActive : ""}`}
                style={{ "--toggle-colour": COLOURS.yellow }}
                onClick={() => setIncludeSuper((current) => !current)}
                type="button"
                aria-pressed={includeSuper}
              >
                <WalletCards size={16} /> Super {includeSuper ? "on" : "off"}
              </button>
            </div>

            {taxMode === "simple" ? (
              <label className={styles.simpleRate}>
                <span className={styles.microLabel}>Combined deduction rate</span>
                <input
                  type="range"
                  min={10}
                  max={50}
                  step={1}
                  value={simpleRate}
                  onChange={(event) => setSimpleRate(Number.parseInt(event.target.value, 10))}
                />
                <strong>{simpleRate}%</strong>
              </label>
            ) : null}

            <div className={styles.statGrid}>
              <StatBox
                label={includeSuper ? "Total package" : "Gross salary"}
                value={formatCurrency(includeSuper ? income.packageValue : income.gross)}
                note={includeSuper ? `Base salary ${formatCurrency(income.gross)}` : "Before tax"}
                color={COLOURS.mint}
              />
              <StatBox
                label="Income tax estimate"
                value={formatCurrency(income.tax)}
                note={taxMode === "ato" ? `${TAX_YEAR} resident brackets` : `${simpleRate}% model`}
                color={COLOURS.pink}
              />
              <StatBox
                label="Medicare allowance"
                value={formatCurrency(income.medicare)}
                note={taxMode === "ato" ? "Simple 2% allowance" : "Included in chosen rate"}
                color={COLOURS.yellow}
              />
              <StatBox
                label={includeHelp ? "HELP repayment estimate" : "After-tax life cost"}
                value={formatCurrency(includeHelp ? income.help : totals.grandYearly)}
                note={includeHelp ? `${TAX_YEAR} marginal settings` : "Your selected categories"}
                color={includeHelp ? COLOURS.purple : COLOURS.blue}
              />
            </div>

            <div className={styles.estimateNote}>
              <Info size={17} />
              <span>
                Planning estimate only. Australian mode uses {TAX_YEAR} resident tax brackets, a simple 2%
                Medicare allowance, 12% super when selected, and current marginal HELP settings. It does not
                model offsets, deductions, Medicare reductions or surcharge, family circumstances, other
                repayment-income adjustments, or every payroll rule. Check the official{" "}
                <a href="https://www.ato.gov.au/tax-rates-and-codes" target="_blank" rel="noreferrer">
                  ATO rates
                </a>{" "}
                and{" "}
                <a
                  href="https://www.studyassist.gov.au/managing-and-repaying-your-loan/loan-repayments"
                  target="_blank"
                  rel="noreferrer"
                >
                  StudyAssist guidance
                </a>{" "}
                for your situation.
              </span>
            </div>
          </div>
        </section>

        {sortedCategories.length > 0 ? (
          <section
            className={styles.breakdownSection}
            id="spending-breakdown"
            style={{ "--section-colour": COLOURS.blue }}
          >
            <div className={styles.sectionHeader}>
              <span className={styles.sectionNumber}>03</span>
              <div>
                <p className={styles.sectionKicker}>See the trade-offs</p>
                <h2 className={styles.sectionTitle}>Where does the money go?</h2>
              </div>
            </div>

            <div className={styles.breakdownPanel}>
              <div className={styles.breakdownLayout}>
                <DonutChart data={donutData} />
                <div className={styles.breakdownList}>
                  {sortedCategories.slice(0, 8).map((category) => {
                    const yearly = totals.byCategory[category.id] || 0;
                    const percentage = totals.grandYearly > 0 ? (yearly / totals.grandYearly) * 100 : 0;
                    const Icon = ICONS[category.icon] || Gem;
                    return (
                      <div
                        className={styles.breakdownRow}
                        key={category.id}
                        style={{
                          "--row-colour": category.color,
                          "--row-width": `${Math.max(percentage, 1)}%`,
                        }}
                      >
                        <span className={styles.breakdownIcon}>
                          <Icon size={15} />
                        </span>
                        <div>
                          <div className={styles.breakdownName}>
                            <span>{category.label}</span>
                            <span>
                              {formatCurrency(yearToDisplay(yearly, displayFrequency))}/
                              {frequencyShort(displayFrequency)}
                            </span>
                          </div>
                          <div className={styles.barTrack}>
                            <div className={styles.barFill} />
                          </div>
                        </div>
                        <span className={styles.breakdownPct}>{percentage.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ) : null}
      </main>

      <footer className={styles.footer}>
        <span>MB-01 // Dream Life Calculator // Planning estimate only</span>
        <span>
          Built by <Link href="/">All That&apos;s Next</Link>
        </span>
      </footer>

      {showShare ? (
        <div className={styles.modalOverlay} onClick={() => setShowShare(false)} role="presentation">
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={() => setShowShare(false)} type="button" aria-label="Close share panel">
              <X size={18} />
            </button>
            <div className={styles.modalHeader}>
              <p className={styles.sectionKicker}>Share centre</p>
              <h2 id="share-title">Your life number</h2>
            </div>
            <div className={styles.shareCard}>
              <div className={styles.shareCardTop}>
                <span className={styles.microLabel}>My Dream Life</span>
                <span className={styles.microLabel}>MB-01</span>
              </div>
              <span className={styles.shareCardValue}>
                {formatCurrency(displayedLifeCost)}
                <small>/{frequencyShort(displayFrequency)}</small>
              </span>
              <p className={styles.shareIncome}>
                Estimated gross income target: {formatCurrency(income.gross)}/year
                {includeSuper ? ` · ${formatCurrency(income.packageValue)} package` : ""}
              </p>
              <div className={styles.shareRows}>
                {sortedCategories.slice(0, 4).map((category) => (
                  <div
                    className={styles.shareRow}
                    key={category.id}
                    style={{ "--share-colour": category.color }}
                  >
                    <span>{category.label}</span>
                    <strong>
                      {formatCurrency(
                        yearToDisplay(totals.byCategory[category.id] || 0, displayFrequency),
                      )}
                      /{frequencyShort(displayFrequency)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.modalActions}>
              <button className={styles.primaryButton} onClick={shareSummary} type="button">
                <Share2 size={16} /> {shareNotice || "Share summary"}
              </button>
              <button className={styles.secondaryButton} onClick={() => setShowShare(false)} type="button">
                Done
              </button>
            </div>
            <p className={styles.modalNote}>You can also screenshot the card. No private budget data is uploaded.</p>
          </div>
        </div>
      ) : null}

      {showHelp ? (
        <div className={styles.modalOverlay} onClick={() => setShowHelp(false)} role="presentation">
          <div
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="help-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={() => setShowHelp(false)} type="button" aria-label="Close help panel">
              <X size={18} />
            </button>
            <div className={styles.modalHeader}>
              <p className={styles.sectionKicker}>Quick start</p>
              <h2 id="help-title">How this works</h2>
            </div>
            <div className={styles.helpSteps}>
              {[
                {
                  number: "1",
                  color: COLOURS.purple,
                  title: "Build the life",
                  text: "Work through each category. Replace the starter amounts and remove what does not belong.",
                },
                {
                  number: "2",
                  color: COLOURS.mint,
                  title: "Watch the number move",
                  text: "Your weekly, monthly or yearly life number updates instantly and saves on this device.",
                },
                {
                  number: "3",
                  color: COLOURS.yellow,
                  title: "Estimate the income",
                  text: "Choose Australian settings or a simple rate, then test HELP debt and super.",
                },
                {
                  number: "4",
                  color: COLOURS.pink,
                  title: "Question the trade-offs",
                  text: "Use the breakdown to decide what matters, what can change and what income paths are realistic.",
                },
              ].map((step) => (
                <div className={styles.helpStep} key={step.number} style={{ "--help-colour": step.color }}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className={styles.primaryButton} onClick={() => setShowHelp(false)} type="button" style={{ width: "100%", marginTop: "1rem" }}>
              Start building
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
