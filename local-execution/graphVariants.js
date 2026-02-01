export const variant1 = {
  nodes: [
    { id: "VK-Lieferung", width: 120, height: 25, label: "VK-Lieferung" },
    { id: "Auftragserstellung", width: 120, height: 25, label: "Auftragserstellung" },
    { id: "VK-Rechnung", width: 120, height: 25, label: "VK-Rechnung" },
    { id: "Start", width: 40, height: 30, label: "Start" },
    { id: "Zahlungseingang", width: 120, height: 25, label: "Zahlungseingang" },
    { id: "End", width: 40, height: 30, label: "End" }
  ],

  edges: [
    { source: "VK-Lieferung", target: "VK-Rechnung", weight: 1, id: "t-vk-lieferung-vk-rechnung" },
    { source: "Auftragserstellung", target: "VK-Lieferung", weight: 1, id: "t-auftragserstellung-vk-lieferung" },
    { source: "VK-Rechnung", target: "Zahlungseingang", weight: 1, id: "t-vk-rechnung-zahlungseingang" },
    { source: "Start", target: "Auftragserstellung", weight: 1, id: "t-start-auftragserstellung" },
    { source: "Zahlungseingang", target: "End", weight: 1, id: "t-zahlungseingang-end" }
  ]
};

export const variant1to2 = {
  nodes: [
    { id: "VK-Lieferung", width: 160, height: 25, label: "VK-Lieferung" },
    { id: "Auftragserstellung", width: 160, height: 25, label: "Auftragserstellung" },
    { id: "VK-Rechnung", width: 160, height: 25, label: "VK-Rechnung" },
    { id: "Start", width: 40, height: 30, label: "Start" },
    { id: "Zahlungseingang", width: 160, height: 25, label: "Zahlungseingang" },
    { id: "End", width: 40, height: 30, label: "End" },
    { id: "zugehoeriger Wareneingang", width: 160, height: 25, label: "zugehoeriger Wareneingang" },
    { id: "Anlage der Bestellung", width: 160, height: 25, label: "Anlage der Bestellung" }
  ],

  edges: [
    { source: "VK-Lieferung", target: "VK-Rechnung", weight: 1, id: "t-vk-lieferung-vk-rechnung" },
    { source: "Auftragserstellung", target: "VK-Lieferung", weight: 1, id: "t-auftragserstellung-vk-lieferung" },
    { source: "VK-Rechnung", target: "Zahlungseingang", weight: 1, id: "t-vk-rechnung-zahlungseingang" },
    { source: "Start", target: "Auftragserstellung", weight: 1, id: "t-start-auftragserstellung" },
    { source: "Zahlungseingang", target: "End", weight: 1, id: "t-zahlungseingang-end" },
    { source: "Auftragserstellung", target: "zugehoeriger Wareneingang", weight: 1, id: "t-auftragserstellung-zugehoeriger_wareneingang" },
    { source: "zugehoeriger Wareneingang", target: "VK-Lieferung", weight: 1, id: "t-zugehoeriger_wareneingang-vk-lieferung" },
    { source: "Anlage der Bestellung", target: "Auftragserstellung", weight: 1, id: "t-anlage_der_bestellung-auftragserstellung" },
    { source: "Start", target: "Anlage der Bestellung", weight: 1, id: "t-start-anlage_der_bestellung" }
  ]
};

export const variant1to3 = {
  nodes: [
    { id: "VK-Lieferung", width: 160, height: 25, label: "VK-Lieferung" },
    { id: "Auftragserstellung", width: 160, height: 25, label: "Auftragserstellung" },
    { id: "VK-Rechnung", width: 160, height: 25, label: "VK-Rechnung" },
    { id: "Start", width: 40, height: 30, label: "Start" },
    { id: "Zahlungseingang", width: 160, height: 25, label: "Zahlungseingang" },
    { id: "End", width: 40, height: 30, label: "End" },
    { id: "zugehoeriger Wareneingang", width: 160, height: 25, label: "zugehoeriger Wareneingang" },
    { id: "Anlage der Bestellung", width: 160, height: 25, label: "Anlage der Bestellung" },
    { id: "Reisekostenerfassung", width: 160, height: 25, label: "Reisekostenerfassung" },
    { id: "Durchfuehrung der Reise", width: 160, height: 25, label: "Durchfuehrung der Reise" },
    { id: "Reisekostenfreigabe 2", width: 160, height: 25, label: "Reisekostenfreigabe 2" },
    { id: "Reisekostenantrag", width: 160, height: 25, label: "Reisekostenantrag" },
    { id: "Reisekostenfreigabe", width: 160, height: 25, label: "Reisekostenfreigabe" },
    { id: "Verbuchung/Kontierung", width: 160, height: 25, label: "Verbuchung/Kontierung" }
  ],

  edges: [
    { source: "VK-Lieferung", target: "VK-Rechnung", weight: 1, id: "t-vk-lieferung-vk-rechnung" },
    { source: "Auftragserstellung", target: "VK-Lieferung", weight: 1, id: "t-auftragserstellung-vk-lieferung" },
    { source: "VK-Rechnung", target: "Zahlungseingang", weight: 1, id: "t-vk-rechnung-zahlungseingang" },
    { source: "Start", target: "Auftragserstellung", weight: 1, id: "t-start-auftragserstellung" },
    { source: "Zahlungseingang", target: "End", weight: 1, id: "t-zahlungseingang-end" },
    { source: "Auftragserstellung", target: "zugehoeriger Wareneingang", weight: 1, id: "t-auftragserstellung-zugehoeriger_wareneingang" },
    { source: "zugehoeriger Wareneingang", target: "VK-Lieferung", weight: 1, id: "t-zugehoeriger_wareneingang-vk-lieferung" },
    { source: "Anlage der Bestellung", target: "Auftragserstellung", weight: 1, id: "t-anlage_der_bestellung-auftragserstellung" },
    { source: "Start", target: "Anlage der Bestellung", weight: 1, id: "t-start-anlage_der_bestellung" },
    { source: "Reisekostenerfassung", target: "Verbuchung/Kontierung", weight: 1, id: "t-reisekostenerfassung-verbuchung/kontierung" },
    { source: "Durchfuehrung der Reise", target: "Reisekostenerfassung", weight: 1, id: "t-durchfuehrung_der_reise-reisekostenerfassung" },
    { source: "Reisekostenfreigabe 2", target: "Durchfuehrung der Reise", weight: 1, id: "t-reisekostenfreigabe_2-durchfuehrung_der_reise" },
    { source: "Reisekostenantrag", target: "Reisekostenfreigabe", weight: 1, id: "t-reisekostenantrag-reisekostenfreigabe" },
    { source: "Reisekostenfreigabe", target: "Reisekostenfreigabe 2", weight: 1, id: "t-reisekostenfreigabe-reisekostenfreigabe_2" },
    { source: "Start", target: "Reisekostenantrag", weight: 1, id: "t-start-reisekostenantrag" },
    { source: "Verbuchung/Kontierung", target: "End", weight: 1, id: "t-verbuchung/kontierung-end" }
  ]
};

export const variant1to4 = {
  nodes: [
    { id: "VK-Lieferung", width: 160, height: 25, label: "VK-Lieferung" },
    { id: "Auftragserstellung", width: 160, height: 25, label: "Auftragserstellung" },
    { id: "VK-Rechnung", width: 160, height: 25, label: "VK-Rechnung" },
    { id: "Start", width: 40, height: 30, label: "Start" },
    { id: "Zahlungseingang", width: 160, height: 25, label: "Zahlungseingang" },
    { id: "End", width: 40, height: 30, label: "End" },
    { id: "zugehoeriger Wareneingang", width: 160, height: 25, label: "zugehoeriger Wareneingang" },
    { id: "Anlage der Bestellung", width: 160, height: 25, label: "Anlage der Bestellung" },
    { id: "Reisekostenerfassung", width: 160, height: 25, label: "Reisekostenerfassung" },
    { id: "Durchfuehrung der Reise", width: 160, height: 25, label: "Durchfuehrung der Reise" },
    { id: "Reisekostenfreigabe 2", width: 160, height: 25, label: "Reisekostenfreigabe 2" },
    { id: "Reisekostenantrag", width: 160, height: 25, label: "Reisekostenantrag" },
    { id: "Reisekostenfreigabe", width: 160, height: 25, label: "Reisekostenfreigabe" },
    { id: "Verbuchung/Kontierung", width: 160, height: 25, label: "Verbuchung/Kontierung" }
  ],

  edges: [
    { source: "VK-Lieferung", target: "VK-Rechnung", weight: 1, id: "t-vk-lieferung-vk-rechnung" },
    { source: "Auftragserstellung", target: "VK-Lieferung", weight: 1, id: "t-auftragserstellung-vk-lieferung" },
    { source: "VK-Rechnung", target: "Zahlungseingang", weight: 1, id: "t-vk-rechnung-zahlungseingang" },
    { source: "Start", target: "Auftragserstellung", weight: 1, id: "t-start-auftragserstellung" },
    { source: "Zahlungseingang", target: "End", weight: 1, id: "t-zahlungseingang-end" },
    { source: "Auftragserstellung", target: "zugehoeriger Wareneingang", weight: 1, id: "t-auftragserstellung-zugehoeriger_wareneingang" },
    { source: "zugehoeriger Wareneingang", target: "VK-Lieferung", weight: 1, id: "t-zugehoeriger_wareneingang-vk-lieferung" },
    { source: "Anlage der Bestellung", target: "Auftragserstellung", weight: 1, id: "t-anlage_der_bestellung-auftragserstellung" },
    { source: "Start", target: "Anlage der Bestellung", weight: 1, id: "t-start-anlage_der_bestellung" },
    { source: "Reisekostenerfassung", target: "Verbuchung/Kontierung", weight: 1, id: "t-reisekostenerfassung-verbuchung/kontierung" },
    { source: "Durchfuehrung der Reise", target: "Reisekostenerfassung", weight: 1, id: "t-durchfuehrung_der_reise-reisekostenerfassung" },
    { source: "Reisekostenfreigabe 2", target: "Durchfuehrung der Reise", weight: 1, id: "t-reisekostenfreigabe_2-durchfuehrung_der_reise" },
    { source: "Reisekostenantrag", target: "Reisekostenfreigabe", weight: 1, id: "t-reisekostenantrag-reisekostenfreigabe" },
    { source: "Reisekostenfreigabe", target: "Reisekostenfreigabe 2", weight: 1, id: "t-reisekostenfreigabe-reisekostenfreigabe_2" },
    { source: "Start", target: "Reisekostenantrag", weight: 1, id: "t-start-reisekostenantrag" },
    { source: "Verbuchung/Kontierung", target: "End", weight: 1, id: "t-verbuchung/kontierung-end" },
    { source: "VK-Rechnung", target: "Anlage der Bestellung", weight: 1, id: "t-vk-rechnung-anlage_der_bestellung" },
    { source: "zugehoeriger Wareneingang", target: "Zahlungseingang", weight: 1, id: "t-zugehoeriger_wareneingang-zahlungseingang" },
    { source: "Anlage der Bestellung", target: "zugehoeriger Wareneingang", weight: 1, id: "t-anlage_der_bestellung-zugehoeriger_wareneingang" }
  ]
};

export const variant1to7 = {
  "nodes" : [
    { id: "VK-Lieferung", width: 160, height: 25, label: "VK-Lieferung" },
    { id: "Auftragserstellung", width: 160, height: 25, label: "Auftragserstellung" },
    { id: "VK-Rechnung", width: 160, height: 25, label: "VK-Rechnung" },
    { id: "Start", width: 40, height: 30, label: "Start" },
    { id: "Zahlungseingang", width: 160, height: 25, label: "Zahlungseingang" },
    { id: "End", width: 40, height: 30, label: "End" },
    { id: "zugehoeriger Wareneingang", width: 160, height: 25, label: "zugehoeriger Wareneingang" },
    { id: "Anlage der Bestellung", width: 160, height: 25, label: "Anlage der Bestellung" },
    { id: "Reisekostenerfassung", width: 160, height: 25, label: "Reisekostenerfassung" },
    { id: "Durchfuehrung der Reise", width: 160, height: 25, label: "Durchfuehrung der Reise" },
    { id: "Reisekostenfreigabe 2", width: 160, height: 25, label: "Reisekostenfreigabe 2" },
    { id: "Reisekostenantrag", width: 160, height: 25, label: "Reisekostenantrag" },
    { id: "Reisekostenfreigabe", width: 160, height: 25, label: "Reisekostenfreigabe" },
    { id: "Verbuchung/Kontierung", width: 160, height: 25, label: "Verbuchung/Kontierung" }
  ],
  edges : [
    { source: "VK-Lieferung", target: "VK-Rechnung", weight: 1 },
    { source: "Auftragserstellung", target: "VK-Lieferung", weight: 1 },
    { source: "VK-Rechnung", target: "Zahlungseingang", weight: 1 },
    { source: "Start", target: "Auftragserstellung", weight: 1 },
    { source: "Zahlungseingang", target: "End", weight: 1 },
    { source: "Auftragserstellung", target: "zugehoeriger Wareneingang", weight: 1 },
    { source: "zugehoeriger Wareneingang", target: "VK-Lieferung", weight: 1 },
    { source: "Anlage der Bestellung", target: "Auftragserstellung", weight: 1 },
    { source: "Start", target: "Anlage der Bestellung", weight: 1 },
    { source: "Reisekostenerfassung", target: "Verbuchung/Kontierung", weight: 1 },
    { source: "Durchfuehrung der Reise", target: "Reisekostenerfassung", weight: 1 },
    { source: "Reisekostenfreigabe 2", target: "Durchfuehrung der Reise", weight: 1 },
    { source: "Reisekostenantrag", target: "Reisekostenfreigabe", weight: 1 },
    { source: "Reisekostenfreigabe", target: "Reisekostenfreigabe 2", weight: 1 },
    { source: "Start", target: "Reisekostenantrag", weight: 1 },
    { source: "Verbuchung/Kontierung", target: "End", weight: 1 },
    { source: "VK-Rechnung", target: "Anlage der Bestellung", weight: 1 },
    { source: "zugehoeriger Wareneingang", target: "Zahlungseingang", weight: 1 },
    { source: "Anlage der Bestellung", target: "zugehoeriger Wareneingang", weight: 1 },
    { source: "VK-Lieferung", target: "zugehoeriger Wareneingang", weight: 1 },
    { source: "zugehoeriger Wareneingang", target: "Anlage der Bestellung", weight: 1 },
    { source: "zugehoeriger Wareneingang", target: "VK-Rechnung", weight: 1 },
    { source: "zugehoeriger Wareneingang", target: "Auftragserstellung", weight: 1 }
  ],
};

export const prepAcyclic = {
  nodes: [
    { id: "A", width: 40, height: 40, label: "A" },
    { id: "C", width: 40, height: 40, label: "C" },
    { id: "Start", width: 40, height: 40, label: "Start" },
    { id: "End", width: 40, height: 40, label: "End" },
    { id: "B", width: 40, height: 40, label: "B" },
  ],

  edges: [
    { source: "A", target: "C", weight: 1},
    { source: "Start", target: "A", weight: 1},
    { source: "B", target: "C", weight: 1},
    { source: "C", target: "End", weight: 1},
    { source: "A", target: "B", weight: 1},
  ]
};

export const triggerAcyclic = {
  nodes: [
    { id: "D", width: 40, height: 40, label: "D" },
    { id: "E", width: 40, height: 40, label: "E" },
    { id: "A", width: 40, height: 40, label: "A" },
    { id: "C", width: 40, height: 40, label: "C" },
    { id: "Start", width: 40, height: 40, label: "Start" },
    { id: "End", width: 40, height: 40, label: "End" },
    { id: "B", width: 40, height: 40, label: "B" },
  ],

  edges: [
    { source: "D", target: "E", weight: 1},
    { source: "A", target: "D", weight: 1},
    { source: "A", target: "C", weight: 1},
    { source: "C", target: "B", weight: 1},
    { source: "E", target: "A", weight: 1 },
    { source: "Start", target: "A", weight: 1 },
    { source: "B", target: "C", weight: 1 },
    { source: "C", target: "End", weight: 1 },
    { source: "A", target: "B", weight: 1 },
  ]
};

export const breakDynamicReverse = {
  nodes: [
    { id: "D", width: 40, height: 40, label: "D" },
    { id: "E", width: 40, height: 40, label: "E" },
    { id: "A", width: 40, height: 40, label: "A" },
    { id: "C", width: 40, height: 40, label: "C" },
    { id: "Start", width: 40, height: 40, label: "Start" },
    { id: "End", width: 40, height: 40, label: "End" },
    { id: "B", width: 40, height: 40, label: "B" },
  ],

  edges: [
    { source: "D", target: "E", weight: 1 },
    //{ source: "A", target: "D", weight: 1 },
    { source: "A", target: "C", weight: 1 },
    { source: "C", target: "B", weight: 1 },
    { source: "E", target: "A", weight: 1 },
    { source: "Start", target: "A", weight: 1 },
    { source: "B", target: "C", weight: 1 },
    { source: "E", target: "End", weight: 1 },
    { source: "A", target: "B", weight: 1 },
    { source: "C", target: "D", weight: 1 },
  ]
};

export const displayBias = {
  nodes: [
    { id: "Start", width: 40, height: 40, label: "Start" },
    { id: "A", width: 40, height: 40, label: "A" },
    { id: "B", width: 40, height: 40, label: "B" },
    { id: "C", width: 40, height: 40, label: "C" },
    { id: "D", width: 40, height: 40, label: "D" },
    { id: "End", width: 40, height: 40, label: "End" },
  ],

  edges: [
    { source: "Start", target: "A", weight: 1 },
    { source: "Start", target: "C", weight: 1 },
    { source: "A", target: "C", weight: 1 },
    { source: "A", target: "B", weight: 1 },
    { source: "A", target: "End", weight: 1 },
    { source: "B", target: "D", weight: 1 },
    { source: "C", target: "D", weight: 1 },
    { source: "D", target: "End", weight: 1 },
  ]
};


export const edgeGrouping = {
  nodes: [
    { id: "B", width: 40, height: 40, label: "B" },
    { id: "Start", width: 40, height: 40, label: "Start" },
    { id: "A", width: 40, height: 40, label: "A" },
    { id: "End", width: 40, height: 40, label: "End" },
  ],

  edges: [
    { source: "B", target: "A", weight: 1 },
    { source: "Start", target: "A", weight: 1 },
    { source: "Start", target: "B", weight: 1 },
    { source: "A", target: "B", weight: 1 },
    { source: "A", target: "End", weight: 1 },
    { source: "B", target: "End", weight: 1 },
  ]
};

export const dynamicOrderPrep = {
  nodes: [
    { id: "B", width: 40, height: 40, label: "B" },
    { id: "Start", width: 40, height: 40, label: "Start" },
    { id: "A", width: 40, height: 40, label: "A" },
    { id: "End", width: 40, height: 40, label: "End" },
    { id: "C", width: 40, height: 40, label: "C" },
  ],

  edges: [
    { source: "B", target: "A", weight: 1 },
    { source: "Start", target: "A", weight: 1 },
    { source: "Start", target: "B", weight: 1 },
    { source: "A", target: "B", weight: 1 },
    { source: "A", target: "C", weight: 1 },
    { source: "B", target: "C", weight: 1 },
    { source: "C", target: "End", weight: 1 },
  ]
};

export const dynamicOrderTrigger = {
  nodes: [
    { id: "B", width: 40, height: 40, label: "B" },
    { id: "Start", width: 40, height: 40, label: "Start" },
    { id: "A", width: 40, height: 40, label: "A" },
    { id: "End", width: 40, height: 40, label: "End" },
    { id: "C", width: 40, height: 40, label: "C" },
  ],

  edges: [
    { source: "B", target: "A", weight: 1 },
    { source: "Start", target: "A", weight: 1 },
    { source: "Start", target: "B", weight: 1 },
    { source: "A", target: "B", weight: 1 },
    { source: "A", target: "C", weight: 1 },
    { source: "B", target: "C", weight: 1 },
    { source: "C", target: "End", weight: 1 },
    { source: "A", target: "End", weight: 1 },
  ]
};

export const alignTypeZero = {
  nodes: [
    { id: "A", width: 40, height: 40, label: "W" },
    { id: "B", width: 40, height: 40, label: "W_r" },
    { id: "C", width: 40, height: 40, label: "C" },
    { id: "D", width: 40, height: 40, label: "D" },
  ],

  edges: [
    { source: "A", target: "C", weight: 1 },
    { source: "B", target: "D", weight: 1 },
  ]
};
