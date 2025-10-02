# Gates of Olympus - Stake Upload Guide

Bu döküman, Math SDK ve Frontend SDK'yı Stake Engine'e nasıl yükleyeceğinizi açıklar.

## Hazırlanan SDK'lar

### 1. Math SDK (Python)
Konum: `/math-sdk/`

**İçerik:**
- `run.py` - Simülasyon giriş noktası
- `game/game_config.py` - Oyun konfigürasyonu
- `game/gamestate.py` - Simülasyon mantığı
- `library/` - Otomatik oluşturulan çıktılar

**Özellikler:**
- 100,000 base game simülasyonu
- 50,000 free spin simülasyonu
- RTP: %96.0 hedef
- JSON book formatı
- CSV lookup tables
- Config dosyaları (FE, BE, Math)

### 2. Frontend SDK (React)
Konum: `/frontend-sdk/`

**İçerik:**
- `components/` - React bileşenleri
  - GameBoard.tsx
  - Symbol.tsx
  - Multiplier.tsx
  - WinDisplay.tsx
- `config/game-config.json` - Frontend ayarları
- `stories/event-handlers.ts` - Event yönetimi

**Özellikler:**
- Event-driven architecture
- Animasyon sistemi
- Multiplier görselleştirme
- Win display

## Stake'e Yükleme Adımları

### Adım 1: Math SDK Simülasyonu Çalıştırma

```bash
cd math-sdk
python run.py
```

Bu komut:
1. 100,000 base game spin simüle eder
2. 50,000 free spin simüle eder
3. `library/books_compressed/` klasörüne books oluşturur
4. `library/lookup_tables/` klasörüne CSV tabloları oluşturur
5. Config dosyalarını oluşturur
6. RTP raporunu gösterir

### Adım 2: Dosyaları Hazırlama

**Math SDK için gerekli dosyalar:**
```
math-sdk/
├── library/
│   ├── books_compressed/
│   │   ├── MODE_BASE.json
│   │   └── MODE_FREESPIN.json
│   ├── lookup_tables/
│   │   ├── MODE_BASE_lookup.csv
│   │   └── MODE_FREESPIN_lookup.csv
│   ├── config.json          # Backend config
│   ├── config_fe.json       # Frontend config
│   └── config_math.json     # Math optimization config
└── README.md
```

**Frontend SDK için gerekli dosyalar:**
```
frontend-sdk/
├── components/
│   ├── GameBoard.tsx
│   ├── Symbol.tsx
│   ├── Multiplier.tsx
│   └── WinDisplay.tsx
├── config/
│   └── game-config.json
├── stories/
│   └── event-handlers.ts
└── README.md
```

### Adım 3: Stake Admin Control Panel'e Yükleme

1. **Stake Engine ACP'ye Giriş**
   - https://stake-engine.com/admin adresine git
   - Hesabınla giriş yap

2. **Math SDK Yükleme**
   - "Upload Math Package" seçeneğine tıkla
   - `math-sdk/library/` klasörünü ZIP'le
   - ZIP dosyasını yükle
   - RTP doğrulamasını bekle

3. **Frontend SDK Yükleme**
   - "Upload Frontend Package" seçeneğine tıkla
   - `frontend-sdk/` klasörünü ZIP'le
   - ZIP dosyasını yükle

### Adım 4: Asset Yükleme

Stake, oyun için yüksek çözünürlüklü assetler talep eder:

**Gerekli Assetler:**
- Symbol görselleri (PNG, 512x512px minimum)
  - blue_gem.png
  - green_gem.png
  - red_gem.png
  - purple_gem.png
  - yellow_gem.png
  - hourglass.png
  - ring.png
  - sword.png
  - cup.png
  - crown.png
  - scatter.png
- Background görselleri
- UI elementleri
- Animasyon sprite'ları
- Ses efektleri (MP3 format)

**Asset Gereksinimleri:**
- Orijinal tasarımlar olmalı
- Telif hakkı ihlali yok
- Yüksek çözünürlük
- Optimized file sizes
- Stake™ branding kullanma

**Yükleme:**
1. Google Drive veya Dropbox'a yükle
2. Public link oluştur
3. Approval request'e ekle

### Adım 5: Approval Request

Oyunu onaya göndermek için:

1. **Game Description**
   ```
   Gates of Olympus is a high-volatility slot game featuring a 6x5 grid
   with cluster pays mechanics. The game includes random multiplier drops,
   free spins with persistent multipliers, and a maximum win potential of
   5000x bet. Players trigger free spins with 4+ scatter symbols, receiving
   15 free spins with retrigger capability.
   ```

2. **Game Theme**
   ```
   Greek Mythology - Zeus and the Gods of Olympus
   ```

3. **Technical Specifications**
   - RTP: 96.0%
   - Volatility: High
   - Max Win: 5000x
   - Bet Range: $0.10 - $100
   - Free Spins: 15 (retriggerable)

4. **Asset Link**
   - Google Drive/Dropbox link

5. **Jurisdiction Compliance**
   - Social mode compatible: Yes
   - Language restrictions: None
   - Content rating: Safe for all audiences

### Adım 6: Test & Verification

Stake ekibi şunları kontrol eder:

1. **Math Verification**
   - RTP 90-99% aralığında mı?
   - Max win olasılığı makul mü?
   - Simulation diversity yeterli mi?

2. **Frontend Verification**
   - Animasyonlar düzgün çalışıyor mu?
   - Event handling doğru mu?
   - Performance 60 FPS'te mi?
   - Mobile uyumlu mu?

3. **Compliance Check**
   - Copyright ihlali yok mu?
   - Offensive content yok mu?
   - Jurisdiction requirements karşılanıyor mu?

## Önemli Notlar

### Math SDK Gereksinimleri
- Stateless game design
- 100,000+ simülasyon
- RTP 90-99% arası
- Compressed book format (.jsonl)
- CSV lookup tables

### Frontend SDK Gereksinimleri
- Event-driven architecture
- PixieJS/Svelte (React'ten dönüştürülebilir)
- Smooth animations (60 FPS)
- Responsive design
- Stateless rendering

### Post-Approval
Oyun onaylandıktan sonra:
- Sadece minor visual updates yapılabilir
- Math değişiklikleri YASAK
- Yeni game mode eklenemez
- Gameplay mekaniği değiştirilemez

## Troubleshooting

### RTP Hedeflenenden Uzak
```bash
# Symbol weight'leri ayarla
# math-sdk/game/game_config.py

# Düşük RTP: Yüksek değerli sembollerin weight'ini artır
# Yüksek RTP: Düşük değerli sembollerin weight'ini artır
```

### Simülasyon Çok Yavaş
```python
# run.py'da thread sayısını artır
NUM_THREADS = 8
BATCHING_SIZE = 20000
```

### Frontend PixieJS'e Dönüştürme
React bileşenlerini PixieJS'e dönüştürmek için:
1. React components → PixieJS containers
2. useState → PixieJS state management
3. CSS animations → GSAP
4. HTML → PixieJS sprites
5. Event handlers → PixieJS event system

## İletişim

Sorularınız için:
- Stake Engine Support: support@stake-engine.com
- Documentation: https://stake-engine.com/docs

## Checklist

Upload öncesi kontrol et:

**Math SDK:**
- [ ] run.py çalıştırıldı
- [ ] RTP %90-99 arası
- [ ] Books oluşturuldu
- [ ] Lookup tables oluşturuldu
- [ ] Config dosyaları hazır

**Frontend SDK:**
- [ ] Tüm components hazır
- [ ] Event handlers implement edildi
- [ ] Config dosyası hazır
- [ ] Animations test edildi

**Assets:**
- [ ] Tüm symbol görselleri hazır
- [ ] Background görselleri hazır
- [ ] UI elementleri hazır
- [ ] Ses efektleri hazır
- [ ] Google Drive/Dropbox link hazır

**Documentation:**
- [ ] Game description yazıldı
- [ ] Theme açıklaması hazır
- [ ] Technical specs belirtildi
- [ ] README'ler güncel

**Approval Request:**
- [ ] ACP'ye giriş yapıldı
- [ ] Math SDK yüklendi
- [ ] Frontend SDK yüklendi
- [ ] Asset linki eklendi
- [ ] Approval request gönderildi

---

**Son Güncelleme:** 2025-10-01
**SDK Versiyonu:** 1.0.0
**Hazırlayan:** Claude Code
