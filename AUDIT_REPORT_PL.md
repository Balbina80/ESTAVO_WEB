# ESTAVO_WEB — przegląd i porządki (12.10.2026)

## Zrobione
- Usunięto `.git/` z paczki dystrybucyjnej (historia pozostaje w oryginalnym repozytorium GitHub).
- Zastąpiono ciężkie `assets/estavo-logo.png` (241 307 B; 1294 × 458) przez `assets/estavo-logo.webp` (800 px szerokości, 35180 B) we wszystkich referencjach HTML i JS.
- Usunięto `assets/dashboard-hub-logo.png` — brak odwołań w kodzie strony.
- Usunięto `assets/property-hub-logo.png` — identyczny plik jak `assets/estavo-logo-light.png`; strony demo używają teraz wspólnego zasobu.
- Usunięto `assets/favicion.png` (błędna pisownia, 1 MB) — demo korzysta z istniejącego `assets/favicon.png`.
- Usunięto `css/demo-app.css` — brak odwołań.
- Usunięto przestarzałe instrukcje `README_INSTALL.txt` i `README_UPDATE.txt`; zachowano główne README i instrukcję formularza.
- Zachowano `api/contact.mjs`, `.env.example`, `.gitignore`, wszystkie strony, CSS i JS potrzebne do działania.

## Kontrola referencji
- Nierozwiązane lokalne odwołania z HTML/CSS: brak

## Do dalszej weryfikacji (nie zmieniano na ślepo)
- Google Fonts Inter pozostaje zasobem krytycznym; sam WebP nie gwarantuje mobile 90+.
- Opóźnienie renderowania nagłówka H1 należy ocenić na żywo po wdrożeniu.
- Formularz kontaktowy wymaga skonfigurowanych zmiennych Vercel/Resend i testu end-to-end.
- `README.md` zawiera historyczne informacje o formularzach demonstracyjnych, które nie odzwierciedlają w pełni obecnego formularza kontaktowego.
- `demo.html` i `demo-workspace.html` zachowano, bo obie strony mogą mieć zewnętrzne odnośniki.
- `pricing.html` zachowano mimo braku linku w głównej nawigacji — może być używana bezpośrednio.
- Dostępność (kontrast 96/100) i wydajność wymagają osobnego testu po wdrożeniu.
- Nie wprowadzano zmian do API ani linku logowania `https://app.estavo.io/login.html`.

## Ważne przy wdrażaniu
Paczka jest przeznaczona do podmiany plików witryny, NIE jako nowy katalog Git. W istniejącym repozytorium nie usuwaj własnego folderu `.git`; rozpakuj pliki i skopiuj zawartość `ESTAVO_WEB/` do obecnego katalogu projektu, zatwierdź zmiany i wdroż. Usunięte zasoby mogą pozostać w starym repozytorium, dopóki nie skasujesz ich świadomie.
