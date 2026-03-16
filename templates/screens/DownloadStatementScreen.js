import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { colors, spacing, fontSizes, fontWeights } from '../../shared/tokens';

const PERIOD_OPTIONS = [
  { id: 'since_opening', label: 'Desde a abertura da conta', subtitle: 'De XX/XX/XX até hoje' },
  { id: 'by_month', label: 'Por mês', subtitle: 'Selecione o mês' },
  { id: 'custom', label: 'Customizado', subtitle: 'Selecione a data inicial e final' },
];

const TYPE_OPTIONS = [
  { id: 'all', label: 'Todos os tipos de transações' },
  { id: 'purchase', label: 'Compra' },
  { id: 'debit', label: 'Débito' },
  { id: 'deposit', label: 'Depósito' },
  { id: 'saved', label: 'Dinheiro guardado' },
  { id: 'redeemed', label: 'Dinheiro resgatado' },
  { id: 'payment', label: 'Pagamento' },
  { id: 'transfer', label: 'Transferência' },
];

const FORMAT_OPTIONS = [
  { id: 'pdf', label: 'PDF' },
  { id: 'xml', label: 'XML' },
  { id: 'csv', label: 'CSV' },
];

function RadioCircle({ selected }) {
  return (
    <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
      {selected && <View style={styles.radioInner} />}
    </View>
  );
}

function BottomSheetModal({
  visible,
  onClose,
  headerTitle,
  sectionTitle,
  sectionSubtitle,
  options,
  selectedId,
  onSelect,
}) {
  const [tempSelected, setTempSelected] = useState(selectedId);

  const handleOpen = () => setTempSelected(selectedId);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onShow={handleOpen}
    >
      <View style={styles.sheetOverlay}>
        <TouchableOpacity style={styles.sheetOverlayBg} activeOpacity={1} onPress={onClose} />
        <View style={styles.sheetContainer}>
          {/* Top bar */}
          <View style={styles.sheetTopBar}>
            <TouchableOpacity style={styles.sheetCloseBtn} onPress={onClose}>
              <Text style={styles.sheetCloseIcon}>✕</Text>
            </TouchableOpacity>
            {headerTitle ? (
              <Text style={styles.sheetHeaderTitle}>{headerTitle}</Text>
            ) : (
              <View style={{ flex: 1 }} />
            )}
            <View style={styles.sheetCloseBtn} />
          </View>

          {/* Section title */}
          <View style={styles.sheetSectionTitleWrap}>
            <Text style={styles.sheetSectionTitle}>{sectionTitle}</Text>
          </View>

          {/* Optional subtitle */}
          {sectionSubtitle && (
            <View style={styles.sheetSubtitleWrap}>
              <Text style={styles.sheetSubtitle}>{sectionSubtitle}</Text>
            </View>
          )}

          {/* Options card */}
          <View style={styles.sheetCardPadding}>
            <ScrollView style={styles.sheetScrollArea} bounces={false} showsVerticalScrollIndicator={false}>
              <View style={styles.sheetCard}>
                {options.map((opt, index) => (
                  <View key={opt.id}>
                    <TouchableOpacity
                      style={styles.sheetRow}
                      activeOpacity={0.7}
                      onPress={() => setTempSelected(opt.id)}
                    >
                      <RadioCircle selected={tempSelected === opt.id} />
                      <View style={styles.sheetRowContent}>
                        <Text style={styles.sheetRowLabel}>{opt.label}</Text>
                        {opt.subtitle && (
                          <Text style={styles.sheetRowSubtitle}>{opt.subtitle}</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                    {index < options.length - 1 && (
                      <View style={styles.sheetDivider} />
                    )}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Selecionar button */}
          <View style={styles.sheetBtnWrap}>
            <TouchableOpacity
              style={[styles.sheetBtn, !tempSelected && styles.sheetBtnDisabled]}
              activeOpacity={tempSelected ? 0.7 : 1}
              disabled={!tempSelected}
              onPress={() => {
                onSelect(tempSelected);
                onClose();
              }}
            >
              <Text style={[styles.sheetBtnText, !tempSelected && styles.sheetBtnTextDisabled]}>
                Selecionar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function formatDateDisplay(date) {
  if (!date) return 'DD/MM/AAAA';
  const d = date.getDate().toString().padStart(2, '0');
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const y = date.getFullYear();
  return `${d}/${m}/${y}`;
}

const MONTH_NAMES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const CELL_SIZE = 44;
const CELL_GAP = 4;

function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = isCurrentMonth ? today.getDate() : -1;

  const cells = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push({ day: daysInPrevMonth - firstDay + 1 + i, type: 'unavailable' });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    if (d === todayDate) {
      cells.push({ day: d, type: 'highlighted' });
    } else if (d >= todayDate || !isCurrentMonth) {
      cells.push({ day: d, type: 'available' });
    } else {
      cells.push({ day: d, type: 'unavailable' });
    }
  }
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let i = 0; i < remaining; i++) {
      cells.push({ day: null, type: 'empty' });
    }
  }
  return cells;
}

function DatePickerSheet({ visible, onClose, title, selectedDate, onSelect }) {
  const now = new Date();
  const [year, setYear] = useState(selectedDate?.getFullYear() || now.getFullYear());
  const [month, setMonth] = useState(selectedDate?.getMonth() ?? now.getMonth());
  const [selectedDay, setSelectedDay] = useState(selectedDate?.getDate() || null);

  const cells = buildCalendarGrid(year, month);
  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  const handlePrevMonth = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else { setMonth(month - 1); }
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else { setMonth(month + 1); }
    setSelectedDay(null);
  };

  const handleConfirm = () => {
    if (selectedDay) {
      onSelect(new Date(year, month, selectedDay));
      onClose();
    }
  };

  const handleShow = () => {
    if (selectedDate) {
      setYear(selectedDate.getFullYear());
      setMonth(selectedDate.getMonth());
      setSelectedDay(selectedDate.getDate());
    } else {
      setYear(now.getFullYear());
      setMonth(now.getMonth());
      setSelectedDay(null);
    }
  };

  const getCellStyle = (cell) => {
    if (cell.type === 'empty') return [styles.calDay];
    const isSelected = cell.type !== 'unavailable' && cell.day === selectedDay;
    if (isSelected) return [styles.calDay, styles.calDaySelected];
    if (cell.type === 'highlighted') return [styles.calDay, styles.calDayHighlighted];
    return [styles.calDay];
  };

  const getTextStyle = (cell) => {
    if (cell.type === 'empty') return styles.calDayText;
    const isSelected = cell.type !== 'unavailable' && cell.day === selectedDay;
    if (isSelected) return [styles.calDayText, styles.calDayTextSelected];
    if (cell.type === 'highlighted') return [styles.calDayText, styles.calDayTextAvailable];
    if (cell.type === 'available') return [styles.calDayText, styles.calDayTextAvailable];
    return [styles.calDayText, styles.calDayTextUnavailable];
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onShow={handleShow}>
      <View style={styles.sheetOverlay}>
        <TouchableOpacity style={styles.sheetOverlayBg} activeOpacity={1} onPress={onClose} />
        <View style={[styles.sheetContainer, { backgroundColor: colors.white }]}>
          {/* Top bar */}
          <View style={styles.sheetTopBar}>
            <TouchableOpacity style={styles.sheetCloseBtn} onPress={onClose}>
              <Text style={styles.sheetCloseIcon}>✕</Text>
            </TouchableOpacity>
            <Text style={styles.sheetHeaderTitle}>{title}</Text>
            <View style={styles.sheetCloseBtn} />
          </View>

          {/* Calendar */}
          <View style={styles.calWrapper}>
            {/* Month header */}
            <View style={styles.calHeader}>
              <Text style={styles.calMonthTitle}>{MONTH_NAMES[month]} {year}</Text>
              <View style={styles.calNavButtons}>
                <TouchableOpacity onPress={handlePrevMonth} style={styles.calNavBtn}>
                  <Text style={styles.calNavChevron}>‹</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNextMonth} style={styles.calNavBtn}>
                  <Text style={styles.calNavChevron}>›</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Weekday row */}
            <View style={styles.calWeekRow}>
              {WEEKDAYS.map((wd, i) => (
                <View key={i} style={styles.calWeekCell}>
                  <Text style={styles.calWeekText}>{wd}</Text>
                </View>
              ))}
            </View>

            {/* Day rows */}
            {weeks.map((week, wi) => (
              <View key={wi} style={styles.calWeekRow}>
                {week.map((cell, ci) => (
                  <TouchableOpacity
                    key={ci}
                    style={getCellStyle(cell)}
                    activeOpacity={cell.type === 'unavailable' || cell.type === 'empty' ? 1 : 0.7}
                    onPress={() => {
                      if (cell.type !== 'unavailable' && cell.type !== 'empty') {
                        setSelectedDay(cell.day);
                      }
                    }}
                    disabled={cell.type === 'unavailable' || cell.type === 'empty'}
                  >
                    <Text style={getTextStyle(cell)}>
                      {cell.day || ''}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>

          {/* Selecionar */}
          <View style={styles.sheetBtnWrap}>
            <TouchableOpacity
              style={[styles.sheetBtn, !selectedDay && styles.sheetBtnDisabled]}
              onPress={handleConfirm}
              activeOpacity={selectedDay ? 0.7 : 1}
              disabled={!selectedDay}
            >
              <Text style={[styles.sheetBtnText, !selectedDay && styles.sheetBtnTextDisabled]}>
                Selecionar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const SHARE_CONTACTS = [
  { id: '1', emoji: '🔵', label: 'AirDrop' },
  { id: '2', emoji: '💬', label: 'Messages' },
  { id: '3', emoji: '✉️', label: 'Mail' },
  { id: '4', emoji: '📱', label: 'WhatsApp' },
];

const SHARE_ACTIONS = [
  { id: 'copy', emoji: '📋', label: 'Copiar' },
  { id: 'edit', emoji: '✏️', label: 'Editar' },
  { id: 'receipt', emoji: '🧾', label: 'Recibo' },
  { id: 'more', emoji: '⋯', label: 'Mais' },
];

function ShareSheet({ visible, onClose, onDownload }) {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={shareStyles.overlay}>
        <TouchableOpacity style={shareStyles.overlayBg} activeOpacity={1} onPress={onClose} />
        <View style={shareStyles.container}>
          {/* Close button */}
          <View style={shareStyles.topBar}>
            <TouchableOpacity style={shareStyles.closeBtn} onPress={onClose}>
              <Text style={shareStyles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* File info */}
          <View style={shareStyles.fileRow}>
            <View style={shareStyles.fileIcon}>
              <Text style={shareStyles.fileIconText}>📄</Text>
            </View>
            <View style={shareStyles.fileInfo}>
              <Text style={shareStyles.fileName}>extrato_nu_Jan_2025</Text>
              <Text style={shareStyles.fileMeta}>PDF Document • 100 kb</Text>
            </View>
          </View>

          {/* Share contacts */}
          <Text style={shareStyles.shareLabel}>Compartilhar com:</Text>
          <View style={shareStyles.contactsRow}>
            {SHARE_CONTACTS.map((c) => (
              <TouchableOpacity key={c.id} style={shareStyles.contactItem} activeOpacity={0.7}>
                <View style={shareStyles.contactAvatar}>
                  <Text style={shareStyles.contactEmoji}>{c.emoji}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Divider */}
          <View style={shareStyles.divider} />

          {/* Action icons */}
          <View style={shareStyles.actionsRow}>
            {SHARE_ACTIONS.map((a) => (
              <TouchableOpacity key={a.id} style={shareStyles.actionItem} activeOpacity={0.7}>
                <View style={shareStyles.actionCircle}>
                  <Text style={shareStyles.actionEmoji}>{a.emoji}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Divider */}
          <View style={shareStyles.divider} />

          {/* Download row */}
          <TouchableOpacity style={shareStyles.downloadRow} activeOpacity={0.7} onPress={onDownload}>
            <View style={shareStyles.downloadIcon}>
              <Text style={shareStyles.downloadIconText}>↓</Text>
            </View>
            <Text style={shareStyles.downloadLabel}>Baixar PDF/Salvar em Arquivos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const shareStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(31, 2, 48, 0.62)',
  },
  container: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 20,
  },
  topBar: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  closeBtn: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.96)',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  fileIcon: {
    width: 48,
    height: 48,
    borderRadius: 64,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileIconText: {
    fontSize: 20,
  },
  fileInfo: {
    flex: 1,
    gap: 4,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.96)',
    letterSpacing: -0.14,
  },
  fileMeta: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.64)',
    letterSpacing: -0.14,
  },
  shareLabel: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.64)',
    paddingHorizontal: 24,
    paddingBottom: 16,
    letterSpacing: -0.14,
  },
  contactsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 45,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  contactItem: {
    alignItems: 'center',
  },
  contactAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactEmoji: {
    fontSize: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#efefef',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  actionItem: {
    alignItems: 'center',
  },
  actionCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionEmoji: {
    fontSize: 24,
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 16,
  },
  downloadIcon: {
    width: 48,
    height: 48,
    borderRadius: 64,
    backgroundColor: '#efefef',
    justifyContent: 'center',
    alignItems: 'center',
  },
  downloadIconText: {
    fontSize: 20,
    color: 'rgba(0, 0, 0, 0.96)',
  },
  downloadLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.96)',
    letterSpacing: -0.14,
    flex: 1,
  },
});

export default function DownloadStatementScreen({ onBack, onDownloadComplete }) {
  const [period, setPeriod] = useState(null);
  const [transactionType, setTransactionType] = useState(null);
  const [format, setFormat] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const [showPeriod, setShowPeriod] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showFormat, setShowFormat] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const isCustom = period === 'custom';
  const isFormComplete = period && transactionType && format && (!isCustom || (startDate && endDate));

  const getLabel = (options, id) => options.find((o) => o.id === id)?.label || null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={onBack}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Baixar extrato</Text>
        <View style={styles.headerSpacer} />
      </View>

      {/* Form */}
      <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContent} showsVerticalScrollIndicator={false}>
        {/* Período */}
        <View style={styles.fieldSection}>
          <Text style={styles.sectionTitle}>Período</Text>
          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.7}
            onPress={() => setShowPeriod(true)}
          >
            <Text style={[styles.dropdownText, !period && styles.dropdownPlaceholder]}>
              {getLabel(PERIOD_OPTIONS, period) || 'Selecione um período'}
            </Text>
            <Text style={styles.dropdownArrow}>▾</Text>
          </TouchableOpacity>
        </View>

        {/* Date range (when custom) */}
        {isCustom && (
          <View style={styles.dateRangeSection}>
            <View style={styles.dateLabelsRow}>
              <Text style={styles.dateLabel}>Data inicial</Text>
              <Text style={styles.dateLabel}>Data final</Text>
            </View>
            <View style={styles.dateCardsRow}>
              <TouchableOpacity
                style={styles.dateCard}
                activeOpacity={0.7}
                onPress={() => setShowStartPicker(true)}
              >
                <Text style={[styles.dateCardText, !startDate && styles.dateCardPlaceholder]}>
                  {formatDateDisplay(startDate)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.dateCard}
                activeOpacity={0.7}
                onPress={() => setShowEndPicker(true)}
              >
                <Text style={[styles.dateCardText, !endDate && styles.dateCardPlaceholder]}>
                  {formatDateDisplay(endDate)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Tipos de transações */}
        <View style={styles.fieldSection}>
          <Text style={styles.sectionTitle}>Tipos de transações</Text>
          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.7}
            onPress={() => setShowType(true)}
          >
            <Text style={[styles.dropdownText, !transactionType && styles.dropdownPlaceholder]}>
              {getLabel(TYPE_OPTIONS, transactionType) || 'Selecione os tipos de transações'}
            </Text>
            <Text style={styles.dropdownArrow}>▾</Text>
          </TouchableOpacity>
        </View>

        {/* Formato */}
        <View style={styles.fieldSection}>
          <Text style={styles.sectionTitle}>Formato</Text>
          <TouchableOpacity
            style={styles.dropdown}
            activeOpacity={0.7}
            onPress={() => setShowFormat(true)}
          >
            <Text style={[styles.dropdownText, !format && styles.dropdownPlaceholder]}>
              {getLabel(FORMAT_OPTIONS, format) || 'Selecione o formato do arquivo'}
            </Text>
            <Text style={styles.dropdownArrow}>▾</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={[styles.downloadBtn, isFormComplete && styles.downloadBtnActive]}
          activeOpacity={isFormComplete ? 0.7 : 1}
          disabled={!isFormComplete}
          onPress={() => setShowShare(true)}
        >
          <Text style={[styles.downloadBtnText, isFormComplete && styles.downloadBtnTextActive]}>
            Baixar extrato
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheets */}
      <BottomSheetModal
        visible={showPeriod}
        onClose={() => setShowPeriod(false)}
        headerTitle="Baixar extrato"
        sectionTitle="Selecione o período do seu extrato"
        sectionSubtitle="2026"
        options={PERIOD_OPTIONS}
        selectedId={period}
        onSelect={setPeriod}
      />

      <BottomSheetModal
        visible={showType}
        onClose={() => setShowType(false)}
        headerTitle="Baixar extrato"
        sectionTitle="Selecione os tipos de transações que estarão no seu extrato"
        options={TYPE_OPTIONS}
        selectedId={transactionType}
        onSelect={setTransactionType}
      />

      <BottomSheetModal
        visible={showFormat}
        onClose={() => setShowFormat(false)}
        headerTitle={null}
        sectionTitle="Selecione o formato de arquivo do seu extrato"
        options={FORMAT_OPTIONS}
        selectedId={format}
        onSelect={setFormat}
      />

      {/* Date pickers */}
      <DatePickerSheet
        visible={showStartPicker}
        onClose={() => setShowStartPicker(false)}
        title="Selecione a data inicial"
        selectedDate={startDate}
        onSelect={setStartDate}
      />
      <DatePickerSheet
        visible={showEndPicker}
        onClose={() => setShowEndPicker(false)}
        title="Selecione a data final"
        selectedDate={endDate}
        onSelect={setEndDate}
      />

      {/* Share sheet */}
      <ShareSheet
        visible={showShare}
        onClose={() => setShowShare(false)}
        onDownload={() => {
          setShowShare(false);
          if (onDownloadComplete) onDownloadComplete();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 64,
  },
  closeButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  headerTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  headerSpacer: {
    width: 44,
  },
  formContainer: {
    flex: 1,
  },
  formContent: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  fieldSection: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 64,
    paddingLeft: spacing.md,
    paddingRight: spacing.sm,
    height: 48,
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
    borderWidth: 1,
    borderColor: 'rgba(31, 0, 47, 0.1)',
  },
  dropdownText: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    flex: 1,
  },
  dropdownPlaceholder: {
    color: 'rgba(31, 2, 48, 0.62)',
  },
  dropdownArrow: {
    fontSize: 14,
    color: 'rgba(31, 2, 48, 0.62)',
    marginLeft: spacing.sm,
  },
  bottomBar: {
    paddingHorizontal: 22,
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  downloadBtn: {
    height: 48,
    borderRadius: 64,
    backgroundColor: '#f0eef1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  downloadBtnActive: {
    backgroundColor: colors.nubankPurple,
  },
  downloadBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: 'rgba(31, 2, 48, 0.3)',
  },
  downloadBtnTextActive: {
    color: colors.white,
  },

  // Bottom Sheet styles
  sheetOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  sheetOverlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(31, 2, 48, 0.62)',
  },
  sheetContainer: {
    backgroundColor: '#f0eef1',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    overflow: 'hidden',
    maxHeight: '85%',
  },
  sheetTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    height: 64,
    paddingTop: 8,
  },
  sheetCloseBtn: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetCloseIcon: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  sheetHeaderTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  sheetSectionTitleWrap: {
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  sheetSectionTitle: {
    fontSize: 20,
    fontWeight: fontWeights.medium,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  sheetSubtitleWrap: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 4,
  },
  sheetSubtitle: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: 'rgba(31, 2, 48, 0.62)',
    lineHeight: 18,
  },
  sheetCardPadding: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sheetScrollArea: {
    maxHeight: 400,
  },
  sheetCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 24,
    overflow: 'hidden',
    paddingVertical: 4,
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
  },
  sheetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  sheetRowContent: {
    flex: 1,
    gap: 4,
  },
  sheetRowLabel: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  sheetRowSubtitle: {
    fontSize: fontSizes.md,
    color: 'rgba(31, 2, 48, 0.62)',
    lineHeight: 21,
  },
  sheetDivider: {
    height: 1,
    backgroundColor: 'rgba(31, 2, 48, 0.08)',
  },
  sheetBtnWrap: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 32,
  },
  sheetBtn: {
    height: 48,
    borderRadius: 64,
    backgroundColor: colors.nubankPurple,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
  },
  sheetBtnDisabled: {
    backgroundColor: '#f0eef1',
  },
  sheetBtnText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.white,
  },
  sheetBtnTextDisabled: {
    color: 'rgba(31, 2, 48, 0.3)',
  },

  // Date range
  dateRangeSection: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  dateLabelsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 4,
  },
  dateLabel: {
    flex: 1,
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: 'rgba(31, 2, 48, 0.62)',
    paddingLeft: 20,
    height: 48,
    lineHeight: 48,
  },
  dateCardsRow: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: spacing.md,
  },
  dateCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: 'rgba(31, 2, 48, 0.08)',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 16,
    shadowColor: '#1F002F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 0,
    elevation: 1,
  },
  dateCardText: {
    fontSize: fontSizes.md,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
    lineHeight: 18,
  },
  dateCardPlaceholder: {
    color: 'rgba(31, 2, 48, 0.3)',
  },

  // Calendar
  calWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    alignItems: 'center',
  },
  calHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 7 * CELL_SIZE + 6 * CELL_GAP,
    height: 24,
    marginBottom: 24,
  },
  calMonthTitle: {
    fontSize: fontSizes.base,
    fontWeight: fontWeights.semibold,
    color: colors.textPrimary,
  },
  calNavButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  calNavBtn: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calNavChevron: {
    fontSize: 22,
    color: colors.textPrimary,
    lineHeight: 22,
  },
  calWeekRow: {
    flexDirection: 'row',
    gap: CELL_GAP,
    marginBottom: CELL_GAP,
  },
  calWeekCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calWeekText: {
    fontSize: 12,
    fontWeight: fontWeights.semibold,
    color: 'rgba(31, 2, 48, 0.62)',
    letterSpacing: 0.12,
    textAlign: 'center',
  },
  calDay: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  calDayHighlighted: {
    backgroundColor: '#f8f6f8',
  },
  calDaySelected: {
    backgroundColor: '#faf6ff',
    borderWidth: 2,
    borderColor: '#820ad1',
  },
  calDayText: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 23,
  },
  calDayTextUnavailable: {
    color: 'rgba(31, 2, 48, 0.3)',
  },
  calDayTextAvailable: {
    fontWeight: fontWeights.semibold,
    color: 'rgba(0, 0, 0, 0.96)',
  },
  calDayTextSelected: {
    fontWeight: fontWeights.semibold,
    color: '#820ad1',
  },

  // Radio button
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(31, 2, 48, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: colors.nubankPurple,
    borderWidth: 2,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.nubankPurple,
  },
});
