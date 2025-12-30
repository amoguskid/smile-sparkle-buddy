import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'nunito': ['Nunito', 'sans-serif'],
				'lilita': ['Lilita One', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					light: 'hsl(var(--primary-light))',
					glow: 'hsl(var(--primary-glow))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					light: 'hsl(var(--secondary-light))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
					light: 'hsl(var(--accent-light))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				yellow: {
					DEFAULT: 'hsl(var(--yellow))',
					light: 'hsl(var(--yellow-light))'
				},
				purple: {
					DEFAULT: 'hsl(var(--purple))',
					light: 'hsl(var(--purple-light))'
				},
				mint: {
					DEFAULT: 'hsl(var(--mint))',
					light: 'hsl(var(--mint-light))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'bounce-gentle': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-15px)'
					}
				},
				'wiggle': {
					'0%, 100%': {
						transform: 'rotate(-5deg)'
					},
					'50%': {
						transform: 'rotate(5deg)'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)',
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
					},
					'50%': {
						opacity: '0.9',
						transform: 'scale(1.03)',
						boxShadow: '0 0 40px hsl(var(--primary) / 0.5)'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(30px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'celebrate': {
					'0%, 100%': {
						transform: 'scale(1) rotate(0deg)'
					},
					'25%': {
						transform: 'scale(1.2) rotate(-10deg)'
					},
					'50%': {
						transform: 'scale(1.3) rotate(10deg)'
					},
					'75%': {
						transform: 'scale(1.2) rotate(-5deg)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0) rotate(0deg)'
					},
					'50%': {
						transform: 'translateY(-20px) rotate(5deg)'
					}
				},
				'blob': {
					'0%, 100%': {
						borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
					},
					'25%': {
						borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%'
					},
					'50%': {
						borderRadius: '50% 60% 40% 60% / 40% 50% 60% 50%'
					},
					'75%': {
						borderRadius: '40% 60% 70% 30% / 60% 40% 50% 60%'
					}
				},
				'jiggle': {
					'0%, 100%': {
						transform: 'rotate(-3deg) scale(1)'
					},
					'25%': {
						transform: 'rotate(3deg) scale(1.02)'
					},
					'50%': {
						transform: 'rotate(-3deg) scale(1)'
					},
					'75%': {
						transform: 'rotate(3deg) scale(1.02)'
					}
				},
				'pop-in': {
					'0%': {
						transform: 'scale(0)',
						opacity: '0'
					},
					'60%': {
						transform: 'scale(1.15)'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'wiggle': 'wiggle 0.8s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
				'slide-up': 'slide-up 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'celebrate': 'celebrate 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
				'float': 'float 3s ease-in-out infinite',
				'blob': 'blob 8s ease-in-out infinite',
				'jiggle': 'jiggle 0.6s ease-in-out infinite',
				'pop-in': 'pop-in 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-secondary': 'var(--gradient-secondary)',
				'gradient-accent': 'var(--gradient-accent)',
				'gradient-rainbow': 'var(--gradient-rainbow)',
				'gradient-morning': 'var(--gradient-morning)',
				'gradient-night': 'var(--gradient-night)',
				'gradient-celebration': 'var(--gradient-celebration)',
				'gradient-bubbly': 'var(--gradient-bubbly)'
			},
			boxShadow: {
				'primary': 'var(--shadow-primary)',
				'secondary': 'var(--shadow-secondary)',
				'glow': 'var(--shadow-glow)',
				'fun': 'var(--shadow-fun)',
				'bubbly': 'var(--shadow-bubbly)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
