import * as api from '../_index';

export interface Chart {
    chart_id: string;
    title: string;
    description?: string;
    is_valid: boolean;
    type: api.ChartTypeEnum;
    x_field: string;
    y_field: string;
    y_fields: string[];
    hide_columns: string[];
    multi_field: string;
    value_field: string;
    previous_value_field: string;
    x_axis: boolean;
    show_x_axis_label: boolean;
    x_axis_label: string;
    y_axis: boolean;
    show_y_axis_label: boolean;
    y_axis_label: string;
    show_axis: boolean;
    animations: boolean;
    gradient: boolean;
    legend: boolean;
    legend_title: string;
    tooltip_disabled: boolean;
    round_edges: boolean;
    round_domains: boolean;
    show_grid_lines: boolean;
    timeline: boolean;
    interpolation: api.ChartInterpolationEnum;
    auto_scale: boolean;
    doughnut: boolean;
    explode_slices: boolean;
    labels: boolean;
    color_scheme: api.ChartColorSchemeEnum;
    scheme_type: api.ChartSchemeTypeEnum;
    page_size: number;
    arc_width: number;
    bar_padding: number;
    group_padding: number;
    inner_padding: number;
    range_fill_opacity: number;
    angle_span: number;
    start_angle: number;
    big_segments: number;
    small_segments: number;
    min: number;
    max: number;
    units: string;
    y_scale_min: number;
    y_scale_max: number;
    x_scale_max: number;
    band_color: string;
    card_color: string;
    text_color: string;
    empty_color: string;
    tile_width: api.ChartTileWidthEnum;
    tile_height: api.ChartTileHeightEnum;
    view_size: api.ChartViewSizeEnum;
    view_width: number;
    view_height: number;
}
