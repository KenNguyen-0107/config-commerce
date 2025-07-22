import Link from "next/link";
import { CollapsibleSection } from "./CollapsibleSection";

export default function SiteFooter() {
  return (
    <footer className="bg-black">
      {/* Desktop Footer */}
      <div className="hidden lg:block container mx-auto px-4 py-8">
        <div className="grid grid-cols-5 gap-8">
          <div>
            <h2 className="footer-heading">BUSINESS</h2>
            <nav className="space-y-2">
              <Link href="/contact" className="footer-link block">
                Contact us
              </Link>
              <Link href="/jobs" className="footer-link block">
                Job Vacancies
              </Link>
              <Link href="/policies" className="footer-link block">
                Policies
              </Link>
              <Link href="/privacy" className="footer-link block">
                Privacy
              </Link>
              <Link href="/legal" className="footer-link block">
                Legal
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="footer-heading">SERVICES</h2>
            <nav className="space-y-2">
              <Link href="/gate-automatic" className="footer-link block">
                Gate automatic
              </Link>
              <Link href="/approved-installer" className="footer-link block">
                Approved installer service
              </Link>
              <Link href="/installation" className="footer-link block">
                Installation & Advice
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="footer-heading">PRODUCTS</h2>
            <nav className="space-y-2">
              <Link href="/quotes" className="footer-link block">
                quotes
              </Link>
              <Link href="/fencing" className="footer-link block">
                Fencing
              </Link>
              <Link href="/gates" className="footer-link block">
                Gates
              </Link>
              <Link href="/landscape" className="footer-link block">
                Landscape & Outdoor Living
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="footer-heading">HELP & SUPPORT</h2>
            <nav className="space-y-2">
              <Link href="/calculator" className="footer-link block">
                Fence Calculator
              </Link>
              <Link href="/builder" className="footer-link block">
                Decking Builder
              </Link>
              <Link href="/gate-builder" className="footer-link block">
                Gate Builder
              </Link>
              <Link href="/faqs" className="footer-link block">
                FAQs
              </Link>
              <Link href="/delivery" className="footer-link block">
                Delivery
              </Link>
              <Link href="/edit" className="footer-link block">
                The edit
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="footer-heading">FOLLOW JACKSONS</h2>
            <div className="flex space-x-3">
              <Link href="https://instagram.com" className="hover:opacity-80">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
              <Link href="https://pinterest.com" className="hover:opacity-80">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </Link>
              <Link href="https://facebook.com" className="hover:opacity-80">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </Link>
              <Link href="https://twitter.com" className="hover:opacity-80">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </Link>
              <Link href="https://linkedin.com" className="hover:opacity-80">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </Link>
              <Link href="https://youtube.com" className="hover:opacity-80">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </Link>
            </div>
            <div className="mt-6">
              <Link
                href="/brochure"
                className="bg-blue text-white px-6 py-3 inline-block font-semibold hover:bg-blue/90 transition-colors"
              >
                REQUEST A BROCHURE
              </Link>
            </div>
            <div className="mt-6">
              <h3 className="text-blue font-semibold mb-2">
                NEED HELP? CALL US
              </h3>
              <Link
                href="tel:08004082234"
                className="text-blue text-2xl font-bold"
              >
                0800 408 2234
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              © Jacksons Fencing 2024 | Website by Sagittarius
            </p>
            <div className="flex items-center space-x-4">
              <svg className="h-8" viewBox="0 0 124 33" fill="#253B80">
                <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906zM66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" />
              </svg>
              <svg
                className="h-8"
                viewBox="0 0 1000.046 323.653"
                fill="#1A1F71"
              >
                <path d="M651.18 0h-75.508l47.254 323.653h75.511L651.18 0z" />
                <path d="M952.97 0L883.463 220.125l-14.57-73.29c-25.037-80.793-82.393-126.736-152.479-126.736H517.575l-3.667 22.128c68.657 16.262 144.084 53.324 179.799 99.099l-15.013 104.327h80.512L952.97 0zM576.979 323.653h77.138L703.105 0h-77.137l-48.989 323.653z" />
              </svg>
              <svg className="h-8" viewBox="0 0 131.39 86.9" fill="#FF5F00">
                <path d="M48.37 15.14h34.66v56.61H48.37z" />
                <path
                  d="M51.94 43.45c0-11.49 5.36-21.72 13.72-28.31A43.09 43.09 0 0043.45 0C19.46 0 0 19.46 0 43.45s19.46 43.45 43.45 43.45a43.09 43.09 0 0022.21-15.14c-8.36-6.59-13.72-16.82-13.72-28.31z"
                  fill="#EB001B"
                />
                <path
                  d="M131.39 43.45c0 23.99-19.46 43.45-43.45 43.45a43.09 43.09 0 01-22.21-15.14c8.36-6.59 13.72-16.82 13.72-28.31s-5.36-21.72-13.72-28.31A43.09 43.09 0 0187.94 0c23.99 0 43.45 19.46 43.45 43.45z"
                  fill="#F79E1B"
                />
              </svg>
              <svg className="h-8" viewBox="0 0 150 40" fill="#00B67A">
                <path d="M19.5 0C8.7 0 0 8.7 0 19.5S8.7 39 19.5 39 39 30.3 39 19.5 30.3 0 19.5 0zm0 36C10.4 36 3 28.6 3 19.5S10.4 3 19.5 3 36 10.4 36 19.5 28.6 36 19.5 36z" />
                <path d="M19.5 7.8l3.7 7.5 8.3 1.2-6 5.9 1.4 8.2-7.4-3.9-7.4 3.9 1.4-8.2-6-5.9 8.3-1.2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="lg:hidden px-4 py-6">
        <div className="mb-6">
          <h3 className="text-blue font-semibold mb-2">
            NEED HELP? CALL US
          </h3>
          <Link
            href="tel:08004082234"
            className="text-blue text-2xl font-bold block mb-4"
          >
            0800 408 2234
          </Link>
          <Link
            href="/brochure"
            className="bg-blue text-white px-6 py-3 w-full text-center inline-block font-semibold"
          >
            REQUEST A BROCHURE
          </Link>
        </div>

        <CollapsibleSection title="BUSINESS">
          <nav className="space-y-3">
            <Link href="/contact" className="footer-link block">
              Contact us
            </Link>
            <Link href="/jobs" className="footer-link block">
              Job Vacancies
            </Link>
            <Link href="/policies" className="footer-link block">
              Policies
            </Link>
            <Link href="/privacy" className="footer-link block">
              Privacy
            </Link>
            <Link href="/legal" className="footer-link block">
              Legal
            </Link>
          </nav>
        </CollapsibleSection>

        <CollapsibleSection title="SERVICES">
          <nav className="space-y-3">
            <Link href="/gate-automatic" className="footer-link block">
              Gate automatic
            </Link>
            <Link href="/approved-installer" className="footer-link block">
              Approved installer service
            </Link>
            <Link href="/installation" className="footer-link block">
              Installation & Advice
            </Link>
          </nav>
        </CollapsibleSection>

        <CollapsibleSection title="PRODUCTS">
          <nav className="space-y-3">
            <Link href="/quotes" className="footer-link block">
              quotes
            </Link>
            <Link href="/fencing" className="footer-link block">
              Fencing
            </Link>
            <Link href="/gates" className="footer-link block">
              Gates
            </Link>
            <Link href="/landscape" className="footer-link block">
              Landscape & Outdoor Living
            </Link>
          </nav>
        </CollapsibleSection>

        <CollapsibleSection title="HELP & SUPPORT">
          <nav className="space-y-3">
            <Link href="/calculator" className="footer-link block">
              Fence Calculator
            </Link>
            <Link href="/builder" className="footer-link block">
              Decking Builder
            </Link>
            <Link href="/gate-builder" className="footer-link block">
              Gate Builder
            </Link>
            <Link href="/faqs" className="footer-link block">
              FAQs
            </Link>
            <Link href="/delivery" className="footer-link block">
              Delivery
            </Link>
            <Link href="/edit" className="footer-link block">
              The edit
            </Link>
          </nav>
        </CollapsibleSection>

        <div>
          <h2 className="footer-heading">FOLLOW JACKSONS</h2>
          <div className="flex space-x-3">
            <Link href="https://instagram.com" className="hover:opacity-80">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </Link>
            <Link href="https://pinterest.com" className="hover:opacity-80">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </Link>
            <Link href="https://facebook.com" className="hover:opacity-80">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
            </Link>
            <Link href="https://twitter.com" className="hover:opacity-80">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </Link>
            <Link href="https://linkedin.com" className="hover:opacity-80">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
              </svg>
            </Link>
            <Link href="https://youtube.com" className="hover:opacity-80">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </Link>
          </div>
          <div className="mt-6">
            <Link
              href="/brochure"
              className="bg-blue text-white px-6 py-3 inline-block font-semibold hover:bg-blue/90 transition-colors"
            >
              REQUEST A BROCHURE
            </Link>
          </div>
          <div className="mt-6">
            <h3 className="text-blue font-semibold mb-2">
              NEED HELP? CALL US
            </h3>
            <Link
              href="tel:08004082234"
              className="text-blue text-2xl font-bold"
            >
              0800 408 2234
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
