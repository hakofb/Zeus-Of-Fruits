# Required Assets for Stake Upload

Bu klasöre yüklenmesi gereken asset'lerin listesi.

## Symbol Images

Her sembol için 512x512px PNG görseli gerekli:

### Gems (Mücevherler)
- `blue_gem.png` - Mavi mücevher
- `green_gem.png` - Yeşil mücevher
- `red_gem.png` - Kırmızı mücevher
- `purple_gem.png` - Mor mücevher
- `yellow_gem.png` - Sarı mücevher

### Premium Symbols (Yüksek Değerli Semboller)
- `crown.png` - Taç (en yüksek ödeme)
- `cup.png` - Kupa
- `sword.png` - Kılıç
- `ring.png` - Yüzük
- `hourglass.png` - Kum saati

### Special Symbols
- `scatter.png` - Scatter sembolü (Zeus'un yıldırımı gibi)

## Background Images

- `background_base.jpg` - Base game arkaplanı (1920x1080px)
- `background_freespins.jpg` - Free spins arkaplanı (1920x1080px)
- `olympus_clouds.png` - Bulutlar (overlay, PNG alpha)
- `olympus_pillars.png` - Yunan sütunları (yan dekorasyon)

## UI Elements

### Buttons
- `button_spin_normal.png` - Normal spin butonu
- `button_spin_hover.png` - Hover state
- `button_spin_pressed.png` - Pressed state
- `button_spin_disabled.png` - Disabled state

### Frames & Borders
- `symbol_frame.png` - Sembol çerçevesi
- `winning_frame.png` - Kazanan sembol çerçevesi
- `multiplier_badge.png` - Multiplier rozeti arkaplanı

### Displays
- `win_panel.png` - Kazanç gösterge paneli
- `info_panel.png` - Info paneli
- `paytable_bg.png` - Paytable arkaplanı

## Effects & Particles

### Multiplier Effects
- `mult_glow.png` - Multiplier glow efekti
- `mult_spark_01.png` - Kıvılcım efekti 1
- `mult_spark_02.png` - Kıvılcım efekti 2
- `mult_spark_03.png` - Kıvılcım efekti 3

### Win Effects
- `win_ray_01.png` - Işık huzmesi 1
- `win_ray_02.png` - Işık huzmesi 2
- `win_particle.png` - Kazanç parçacığı
- `gold_coin.png` - Altın para (kazanç animasyonu için)

### Lightning Effects (Zeus Theme)
- `lightning_01.png` - Yıldırım efekti 1
- `lightning_02.png` - Yıldırım efekti 2
- `lightning_03.png` - Yıldırım efekti 3

## Sound Effects

### Game Sounds
- `spin.mp3` - Spin sesi (reel dönme)
- `reel_stop.mp3` - Reel durma sesi
- `symbol_land.mp3` - Sembol iniş sesi

### Win Sounds
- `win_small.mp3` - Küçük kazanç
- `win_medium.mp3` - Orta kazanç
- `win_big.mp3` - Büyük kazanç
- `win_mega.mp3` - Mega kazanç (100x+)

### Feature Sounds
- `scatter.mp3` - Scatter land sesi
- `multiplier_drop.mp3` - Multiplier düşme sesi
- `multiplier_add.mp3` - Multiplier ekleme sesi
- `freespin_trigger.mp3` - Free spin tetikleme
- `freespin_start.mp3` - Free spin başlangıç
- `freespin_end.mp3` - Free spin bitiş
- `retrigger.mp3` - Retrigger sesi

### Ambient Sounds
- `ambient_base.mp3` - Base game ambient (loop)
- `ambient_freespins.mp3` - Free spins ambient (loop)
- `thunder.mp3` - Gök gürültüsü efekti

## Animation Sprites

### Symbol Animations
Her sembol için animasyon sprite sheet'i (opsiyonel):
- `[symbol]_idle.png` - Durağan animasyon
- `[symbol]_win.png` - Kazanç animasyonu
- Format: Sprite sheet, 10 frame, 512x512px her frame

### Character Animation (Zeus)
Eğer karakter animasyonu eklenirse:
- `zeus_idle.png` - Zeus durağan
- `zeus_celebrate.png` - Zeus kutlama
- `zeus_lightning.png` - Zeus yıldırım atma

## Font Files

- `olympus_regular.ttf` - Normal metin
- `olympus_bold.ttf` - Kalın metin
- `olympus_display.ttf` - Başlıklar ve kazanç gösterimi

## Asset Specifications

### Image Format
- Format: PNG (alpha channel destekli)
- Color Mode: RGBA
- Bit Depth: 32-bit

### Resolution Requirements
- Symbols: 512x512px minimum
- Backgrounds: 1920x1080px (Full HD)
- UI Elements: 2x resolution (Retina ready)
- Effects: Variable, optimize edilmiş

### File Size Guidelines
- Individual symbols: < 200KB each
- Backgrounds: < 500KB each
- Effects: < 100KB each
- Total package: < 50MB

### Audio Format
- Format: MP3
- Bitrate: 192kbps
- Sample Rate: 44.1kHz
- Mono/Stereo: Stereo for ambient, Mono for effects

## Design Guidelines

### Theme: Greek Mythology - Gates of Olympus
- Color Palette: Gold, Blue, White, Purple
- Style: Epic, Mythological, Ancient Greece
- Mood: Majestic, Powerful, Divine

### Symbol Design
- Clear, recognizable silhouettes
- High contrast for visibility
- Consistent art style across all symbols
- Gems should sparkle/shine
- Premium symbols should feel valuable

### Animation Style
- Smooth, fluid movements
- Epic, grand feel
- Lightning effects for big wins
- Golden particles for celebration

### UI Design
- Clean, readable typography
- Gold accents for premium feel
- Blue for divine/celestial elements
- Easy-to-understand iconography

## Asset Creation Tools

Recommended tools:
- Adobe Photoshop - Raster graphics
- Adobe Illustrator - Vector graphics
- Blender - 3D rendering (for symbols)
- After Effects - Animation
- Audacity - Audio editing

## Copyright & Licensing

**IMPORTANT:**
- All assets MUST be original creations
- No stock assets from other slot games
- No copyrighted characters/brands
- No Stake™ branding
- Ensure you have rights to all assets

## Placeholder Assets

Development sırasında placeholder kullanabilirsiniz:
- Unsplash - Ücretsiz fotoğraflar
- Pexels - Ücretsiz stok görseller
- Freesound - Ücretsiz ses efektleri

**Ama production için orijinal asset'ler oluşturmalısınız!**

## Asset Delivery

Assets hazır olduğunda:

1. Tüm dosyaları organize edin:
```
assets/
├── symbols/
├── backgrounds/
├── ui/
├── effects/
├── sounds/
└── fonts/
```

2. ZIP dosyası oluşturun
3. Google Drive veya Dropbox'a yükleyin
4. Public link oluşturun
5. Stake approval request'e ekleyin

## Quality Checklist

- [ ] Tüm symbol görselleri 512x512px
- [ ] PNG format, alpha channel var
- [ ] Consistent art style
- [ ] High resolution, sharp edges
- [ ] Optimized file sizes
- [ ] Tüm ses efektleri MP3 format
- [ ] Audio normalized
- [ ] No clipping or distortion
- [ ] Background images Full HD
- [ ] UI elements 2x resolution
- [ ] Tüm dosyalar doğru isimlendirilmiş
- [ ] Copyright clear, orijinal eserler

---

**Not:** Bu assetler olmadan da Math SDK test edilebilir, ama final Stake upload için gereklidir.
