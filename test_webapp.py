#!/usr/bin/env python3
"""Test WCAG AI Auditor webapp using Playwright"""

from playwright.sync_api import sync_playwright
import time

def test_wcag_auditor():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        print("1. Loading WCAG AI Auditor...")
        page.goto('https://wcag-ai-auditor.vercel.app')
        page.wait_for_load_state('networkidle')

        # Take initial screenshot
        page.screenshot(path='/tmp/wcag-auditor-01-homepage.png', full_page=True)
        print("   Screenshot: /tmp/wcag-auditor-01-homepage.png")

        # Check page title and header
        title = page.title()
        print(f"   Page title: {title}")

        header_text = page.locator('h1').first.text_content()
        print(f"   Header: {header_text}")

        # 2. Test URL tab (should be default)
        print("\n2. Testing URL tab...")
        url_input = page.locator('input[type="text"]')
        url_input.fill('https://example.com')
        page.screenshot(path='/tmp/wcag-auditor-02-url-input.png', full_page=True)
        print("   Screenshot: /tmp/wcag-auditor-02-url-input.png")

        # Click analyze button
        print("   Clicking Analyze button...")
        page.locator('button:has-text("Analysera")').click()

        # Wait for loading state or result
        print("   Waiting for analysis...")
        page.wait_for_timeout(15000)  # Wait up to 15 seconds for API
        page.screenshot(path='/tmp/wcag-auditor-03-url-result.png', full_page=True)
        print("   Screenshot: /tmp/wcag-auditor-03-url-result.png")

        # 3. Go back and test Code tab
        print("\n3. Testing Code tab...")
        # Click "Ny analys" button if visible
        new_analysis_btn = page.locator('button:has-text("Ny analys")')
        if new_analysis_btn.is_visible():
            new_analysis_btn.click()
            page.wait_for_timeout(500)

        # Click on Code tab
        page.locator('button:has-text("Kod")').click()
        page.wait_for_timeout(500)
        page.screenshot(path='/tmp/wcag-auditor-04-code-tab.png', full_page=True)
        print("   Screenshot: /tmp/wcag-auditor-04-code-tab.png")

        # Click "Ladda exempelkod" link
        example_link = page.locator('text=Ladda exempelkod')
        if example_link.is_visible():
            example_link.click()
            page.wait_for_timeout(500)
            page.screenshot(path='/tmp/wcag-auditor-05-example-code.png', full_page=True)
            print("   Screenshot: /tmp/wcag-auditor-05-example-code.png")

        # Click analyze button for code
        print("   Analyzing example code...")
        page.locator('button:has-text("Analysera kod")').click()
        page.wait_for_timeout(15000)  # Wait for API
        page.screenshot(path='/tmp/wcag-auditor-06-code-result.png', full_page=True)
        print("   Screenshot: /tmp/wcag-auditor-06-code-result.png")

        # 4. Check results if visible
        print("\n4. Checking results...")
        score_element = page.locator('text=/\\d+.*\\/100/')
        if score_element.count() > 0:
            print(f"   Score found on page")

        issues = page.locator('[class*="issue"], [class*="card"]').count()
        print(f"   Found {issues} issue cards on page")

        # Expand first issue if available
        issue_cards = page.locator('button[aria-expanded]')
        if issue_cards.count() > 0:
            issue_cards.first.click()
            page.wait_for_timeout(500)
            page.screenshot(path='/tmp/wcag-auditor-07-expanded-issue.png', full_page=True)
            print("   Screenshot: /tmp/wcag-auditor-07-expanded-issue.png")

        print("\n5. Test complete!")
        print("\nAll screenshots saved to /tmp/wcag-auditor-*.png")

        browser.close()

if __name__ == "__main__":
    test_wcag_auditor()
