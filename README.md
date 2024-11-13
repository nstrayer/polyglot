# Polyglot - AI-Powered Code Translation Tool

Polyglot is an experimental React application that translates code between different programming languages (currently supporting Python, R, TypeScript, and Go). It's unique in that it provides the AI model with context about the user's installed packages, potentially improving translation accuracy by considering available dependencies.

## Features

- Translate between Python, R, TypeScript, and Go
- Real-time translation using AI models (OpenAI GPT-4 and Anthropic Claude)
- Context-aware translations using installed package information
- Interactive UI with syntax highlighting
- Feedback loop for translation improvements

## Getting Started

Unfortunately, AI APIs are expensive, so to use this app you'll need to run it locally with your own API keys. Fortunately, it's easy to get started...

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- API keys for either OpenAI or Anthropic (or both)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nstrayer/polyglot.git
cd polyglot
```

2. Install dependencies:

```bash
npm install
```
3. Open the `.env.local.template` file in the root directory and replace the placeholder values with your API keys. When finished, rename the file to `.env.local`.

4. Start the development server:

```bash
npm run dev
```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## How It Works

1. Enter your source code in the left editor
2. Select the source and target languages
3. Provide your installed packages list (use the sidebar)
4. Click "Convert" to translate
5. Optionally provide feedback to improve the translation

The application uses the installed packages information to make better decisions about library usage in the translated code. For example, if you're translating from R to Python and have `pandas` installed, it might prefer using `pandas` over base Python data structures.

## Contributing

Contributions are welcome! This is an experimental project aimed at exploring AI-powered code translation. Feel free to open issues or submit pull requests.

## License

[MIT License](LICENSE)

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Uses [Tailwind CSS](https://tailwindcss.com/) for styling
- Base components from [shadcn/ui](https://ui.shadcn.com/)
- AI powered by [OpenAI](https://openai.com/) and [Anthropic](https://anthropic.com/)

## Note

This is an experimental project and translations may not be perfect. Always review and test translated code before using in production environments.